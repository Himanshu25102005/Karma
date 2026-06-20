const mongoose = require('mongoose');
const Badge = require('../models/badges');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/StravaDB';

const badges = [
  {
    name: "Ignition",
    description: "Start your journey",
    icon: "⚡",
    color: "#F59E0B",
    criteria: { criteriaType: "sessions", count: 1 },
    rarity: "Common"
  },

  {
    name: "Locked In",
    description: "Complete 5 sessions",
    icon: "🎯",
    color: "#10B981",
    criteria: { criteriaType: "sessions", count: 5 },
    rarity: "Common"
  },

  {
    name: "Momentum",
    description: "3 day streak",
    icon: "🔥",
    color: "#F97316",
    criteria: { criteriaType: "streak", count: 3 },
    rarity: "Common"
  },

  {
    name: "Deep Diver",
    description: "Focus 120 minutes",
    icon: "🌊",
    color: "#0EA5E9",
    criteria: { criteriaType: "minutes", count: 120 },
    rarity: "Common"
  },

  {
    name: "Builder",
    description: "Create 3 projects",
    icon: "🛠️",
    color: "#6366F1",
    criteria: { criteriaType: "projects", count: 3 },
    rarity: "Common"
  },

  {
    name: "Flow State",
    description: "7 day streak",
    icon: "🧠",
    color: "#14B8A6",
    criteria: { criteriaType: "streak", count: 7 },
    rarity: "Rare"
  },

  {
    name: "Focus Engine",
    description: "25 sessions completed",
    icon: "⚙️",
    color: "#22C55E",
    criteria: { criteriaType: "sessions", count: 25 },
    rarity: "Rare"
  },

  {
    name: "Time Investor",
    description: "500 focused minutes",
    icon: "⏳",
    color: "#F59E0B",
    criteria: { criteriaType: "minutes", count: 500 },
    rarity: "Rare"
  },

  {
    name: "Multi Operator",
    description: "5 active projects",
    icon: "📂",
    color: "#8B5CF6",
    criteria: { criteriaType: "projects", count: 5 },
    rarity: "Rare"
  },

  {
    name: "Relentless",
    description: "14 day streak",
    icon: "🚀",
    color: "#EF4444",
    criteria: { criteriaType: "streak", count: 14 },
    rarity: "Rare"
  },

  {
    name: "System Builder",
    description: "50 sessions completed",
    icon: "🏗️",
    color: "#3B82F6",
    criteria: { criteriaType: "sessions", count: 50 },
    rarity: "Epic"
  },

  {
    name: "Deep Work Monk",
    description: "1000 focused minutes",
    icon: "🧘",
    color: "#06B6D4",
    criteria: { criteriaType: "minutes", count: 1000 },
    rarity: "Epic"
  },

  {
    name: "Consistency King",
    description: "30 day streak",
    icon: "👑",
    color: "#EAB308",
    criteria: { criteriaType: "streak", count: 30 },
    rarity: "Epic"
  },

  {
    name: "Project Architect",
    description: "10 active projects",
    icon: "🏛️",
    color: "#7C3AED",
    criteria: { criteriaType: "projects", count: 10 },
    rarity: "Epic"
  },

  {
    name: "The Grind",
    description: "100 sessions completed",
    icon: "💀",
    color: "#DC2626",
    criteria: { criteriaType: "sessions", count: 100 },
    rarity: "Epic"
  },

  {
    name: "Machine Mode",
    description: "60 day streak",
    icon: "🤖",
    color: "#06B6D4",
    criteria: { criteriaType: "streak", count: 60 },
    rarity: "Legendary"
  },

  {
    name: "Chronomancer",
    description: "5000 focused minutes",
    icon: "⌛",
    color: "#F97316",
    criteria: { criteriaType: "minutes", count: 5000 },
    rarity: "Legendary"
  },

  {
    name: "Master Builder",
    description: "250 sessions completed",
    icon: "🏆",
    color: "#FACC15",
    criteria: { criteriaType: "sessions", count: 250 },
    rarity: "Legendary"
  },

  {
    name: "KARMA Core",
    description: "365 day streak",
    icon: "☯️",
    color: "#8B5CF6",
    criteria: { criteriaType: "streak", count: 365 },
    rarity: "Legendary"
  },

  {
    name: "SYSTEM_V2",
    description: "10000 focused minutes",
    icon: "⚜️",
    color: "#EC4899",
    criteria: { criteriaType: "minutes", count: 10000 },
    rarity: "Mythic"
  }
];

async function seedBadges() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to database');

    await Badge.deleteMany({});
    console.log('Cleared existing badges');

    const createdBadges = await Badge.insertMany(badges);
    console.log(`✅ Successfully seeded ${createdBadges.length} badges`);

    await mongoose.connection.close();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding badges:', error);
    process.exit(1);
  }
}

seedBadges();