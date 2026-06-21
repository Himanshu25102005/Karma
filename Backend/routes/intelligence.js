require("dotenv").config();
const userSchema = require("../models/users");
const Project = require("../models/projects");
const express = require("express");
const Session = require("../models/focSessions");
var router = express.Router();
const passport = require("passport");
const UserBadge = require("../models/userbadge");
const Badge = require("../models/badges");
const checkAndAwardBadges = require("../utils/checkAndAwardBadges");
const cache = require("../models/cache");
const Groq = require("groq-sdk");
const streak = require("../utils/streak");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/* Middleware to check if the user is logged in  */
const isloggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({
    success: false,
    error: "Authentication required",
  });
};

/* export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  console.log(chatCompletion.choices[0]?.message?.content || "");
} */

const getGroqChatCompletion = async (data) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an AI productivity analyst for a developer-focused productivity platform called KARMA.

Your task is to analyze the user's productivity data provided in JSON format and generate actionable insights.

Return ONLY valid JSON.

Do not include markdown.
Do not include explanations outside the JSON.
Do not include code blocks.
Do not invent data that cannot be reasonably inferred from the input.
IMPORTANT:
All duration values in the input data are measured in seconds.
Convert to minutes or hours when generating insights.
Analyze the data and generate insights for the following sections:

1. bestFocusWindow
   - Determine the time range where the user performs their strongest focus sessions.
   - Include a confidence percentage.
   - Explain briefly why this window was selected.

2. mostProductiveProject
   - Determine the project with the highest productivity impact.
   - Consider total focus time, consistency, and completed sessions.
   - Explain briefly why it stands out.
   - In the insights for most productive project, do not only speak about focus time and session count, give a good quality insight

3. focusLeak
   - Identify the day, project, or pattern where productivity was lost.
   - Examples:
     - abandoned sessions
     - frequent interruptions
     - low completion rate
     - inconsistent work periods
   - Explain the issue clearly.

4. recommendation
   - Generate one specific and actionable recommendation.
   - The recommendation must be directly supported by the user's data.
   - Avoid generic productivity advice.
   - Focus on suggestions which can lead user to improve thier overall work styles.
   - Give titles of maximum 2 words, but keep it meaningfull
   - Don't focus only on certain aspects.

Guidelines:
- Base every insight strictly on the provided data.
- Do not invent statistics, percentages, durations, trends, or events that cannot be inferred from the input.
- If completed session count is below 10:
  - Reduce confidence scores.
  - Mention that more focus sessions are needed for stronger pattern detection.
  - Prefer general but relevant recommendations instead of strong conclusions.
- If evidence for a conclusion is weak, use cautious language.
- Confidence should reflect the strength of the available evidence and sample size.
- Prefer meaningful behavioral patterns over simple metric summaries.
- Use human-readable terms such as weekdays, time ranges, and project names.
- Keep titles concise and actionable.
- Keep insights concise and easy to scan.
- Be specific, practical, and data-driven.
- Prefer observations and recommendations over motivational language.
- Recommendations must be directly supported by the provided data.
- Avoid repeating the same information across multiple sections.
- Never mention AI, models, confidence calculations, datasets, databases, aggregations, or internal analysis processes.
- Never output null, empty, or placeholder values.
- Always return valid JSON matching the required schema.
Return JSON using EXACTLY this schema:

{
  "bestFocusWindow": {
    "timeRange": "10:00 AM - 1:00 PM",
    "confidence": 73,
    "insight": "73% of your longest sessions occurred during this period."
  },
  "mostProductiveProject": {
    "project": "Karma",
    "metric": "2h 17m this week",
    "insight": "Highest total focus time and session consistency."
  },
  "focusLeak": {
    "title": "Thursday",
    "insight": "You started 4 sessions but completed only 2."
  },
  "recommendation": {
    "title": "Schedule DSA Before Noon",
    "insight": "Average session duration is 38% higher during your morning sessions."
  }
}`,
      },
      {
        role: "user",
        content: `
        Analyze the following productivity data and return insights.

        ${JSON.stringify(data)}
        `,
      },
    ],
    model: "openai/gpt-oss-20b",
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "karma_analysis",
        strict: true,
        schema: {
          type: "object",
          properties: {
            bestFocusWindow: {
              type: "object",
              properties: {
                timeRange: { type: "string" },
                confidence: {
                  type: "integer",
                  minimum: 0,
                  maximum: 100,
                },
                insight: { type: "string" },
              },
              required: ["timeRange", "confidence", "insight"],
              additionalProperties: false,
            },
            mostProductiveProject: {
              type: "object",
              properties: {
                project: { type: "string" },
                metric: { type: "string" },
                insight: { type: "string" },
              },
              required: ["project", "metric", "insight"],
              additionalProperties: false,
            },
            focusLeak: {
              type: "object",
              properties: {
                title: { type: "string" },
                insight: { type: "string" },
              },
              required: ["title", "insight"],
              additionalProperties: false,
            },
            recommendation: {
              type: "object",
              properties: {
                title: { type: "string" },
                insight: { type: "string" },
              },
              required: ["title", "insight"],
              additionalProperties: false,
            },
          },
          required: [
            "bestFocusWindow",
            "mostProductiveProject",
            "focusLeak",
            "recommendation",
          ],
          additionalProperties: false,
        },
      },
    },
  });
};

const API_Call_Logic = async (userId) => {
  const [sessionData, streakData, topProjects, focusWindowData, dayWiseData] =
    await Promise.all([
      /* For sessionData */
      Session.aggregate([
        {
          $match: {
            userId: userId,
            status: "completed",
            duration: { $gte: 0 },
          },
        },
        {
          $group: {
            _id: null,
            totalFocusTime: { $sum: "$duration" },
            averageSessionDuration: { $avg: "$duration" },
            totalSessions: { $sum: 1 },
          },
        },
      ]),

      /* For streakData */
      streak(userId),

      /* For topProjects */
      Project.find({
        userId: userId,
      })
        .sort({ totalMinutes: -1 })
        .limit(5)
        .select("name totalMinutes totalSessions"),

      /* For focusWindowData */
      Session.aggregate([
        {
          $match: {
            userId: userId,
            status: "completed",
          },
        },
        {
          $project: {
            hour: {
              $hour: {
                date: "$startTime",
                timezone: "Asia/Kolkata",
              },
            },
            duration: 1,
          },
        },
        {
          $group: {
            _id: "$hour",
            totalDurationMinutes: {
              $sum: {
                $divide: ["$duration", 60],
              },
            },
            avgDurationMinutes: {
              $avg: {
                $divide: ["$duration", 60],
              },
            },
            sessions: { $sum: 1 },
          },
        },
      ]),

      /* For dayWiseData */
      Session.aggregate([
        {
          $match: {
            userId: userId,
          },
        },
        {
          $project: {
            day: { $dayOfWeek: "$startTime" },
            status: 1,
            duration: 1,
          },
        },
        {
          $group: {
            _id: "$day",
            totalSessions: { $sum: 1 },
            completedSessions: {
              $sum: {
                $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
              },
            },
            avgDuration: { $avg: "$duration" },
          },
        },
      ]),
    ]);

  const overview = sessionData[0] || {
    totalFocusTime: 0,
    averageSessionDuration: 0,
    totalSessions: 0,
  };

  const days = {
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    7: "Saturday",
  };

  const focusWindowDataFormatted = focusWindowData.map((item) => {
    const startHour = item._id;
    const endHour = (startHour + 1) % 24;

    const formatHour = (hour) => {
      const suffix = hour >= 12 ? "PM" : "AM";
      const h = hour % 12 || 12;
      return `${h}:00 ${suffix}`;
    };

    return {
      timeRange: `${formatHour(startHour)} - ${formatHour(endHour)}`,
      totalDurationMinutes: item.totalDurationMinutes,
      avgDurationMinutes: item.avgDurationMinutes,
      sessions: item.sessions,
    };
  });

  const formattedDayWiseData = dayWiseData.map((item) => ({
    day: days[item._id],
    totalSessions: item.totalSessions,
    completedSessions: item.completedSessions,
    avgDuration: item.avgDuration,
  }));

  const data = {
    overview: {
      totalFocusTime: overview.totalFocusTime,
      averageSessionDuration: overview.averageSessionDuration,
      currentStreak: streakData.currentStreak,
      longestStreak: streakData.longestStreak,
    },

    topProjects: topProjects,

    focusWindowDataFormatted,

    formattedDayWiseData,
  };

  const ModelResponse = await getGroqChatCompletion(data);
  let response;

  try {
    if (!ModelResponse?.choices?.[0]?.message?.content) {
      throw new Error("Empty AI response");
    }
    response = JSON.parse(ModelResponse.choices[0].message.content);
  } catch (err) {
    console.error("Failed to parse AI response", err);
    throw err;
  }

  /* Sdtore Data */
  await cache.findOneAndUpdate(
    {
      userId: userId,
    },
    {
      $set: {
        generatedAt: new Date(),
        model: ModelResponse.model,
        insights: response,
        totalSessions: overview.totalSessions,
      },
    },
    {
      upsert: true,
    },
  );

  return response;
};

const API_Call_Decider = async (userId) => {
  console.log("Checking cache...");
  const cacheDoc = await cache
    .findOne({
      userId,
    })
    .select("generatedAt totalSessions");

  if (!cacheDoc) {
    return true;
  }

  const totalSessions = await Session.countDocuments({
    userId,
    status: "completed",
    duration: { $gte: 0 },
  });

  const isExpired =
    Date.now() - cacheDoc.generatedAt.getTime() > 24 * 60 * 60 * 1000;

  const hasNewSessions = totalSessions > cacheDoc.totalSessions;
  console.log("Cache found:", !!cacheDoc);
  if (isExpired || hasNewSessions) {
    return true;
  }
  console.log("Need new AI call:", isExpired || hasNewSessions);
  return false;
};

router.get("/analytics/intelligence/call", isloggedIn, async (req, res) => {
  try {
    const decider = await API_Call_Decider(req.user._id);
    let response;

    if (decider == true) {
      console.log("CALLING GROQ");
      response = await API_Call_Logic(req.user._id);
    }
    if (decider == false) {
      console.log("USING CACHE");
      response = await cache.findOne({
        userId: req.user._id,
      });
    }

    res.status(200).json({
      data: response,
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
});

module.exports = router;
