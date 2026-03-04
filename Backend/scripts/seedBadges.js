const mongoose = require('mongoose');
const Badge = require('../models/badge');

// Your database connection string

const badges = [
  {
    name: "First Step",
    description: "Complete your first focus session",
    icon: "🎯",
    category: "sessions",
    criteria: { type: "sessions", count: 1 },
    rarity: "common"
  },
  {
    name: "Week Warrior",
    description: "Maintain a 7-day coding streak",
    icon: "🔥",
    category: "streak",
    criteria: { type: "streak", count: 7 },
    rarity: "rare"
  },
  {
    name: "Century Club",
    description: "Complete 100 focus sessions",
    icon: "💯",
    category: "sessions",
    criteria: { type: "sessions", count: 100 },
    rarity: "epic"
  },
  {
    name: "Marathon Runner",
    description: "Complete a 5-hour focus session",
    icon: "🏃",
    category: "time",
    criteria: { type: "sessionDuration", minutes: 300 },
    rarity: "rare"
  },
  {
    name: "Night Owl",
    description: "Complete a session after midnight",
    icon: "🦉",
    category: "time",
    criteria: { type: "timeOfDay", after: "00:00", before: "05:00" },
    rarity: "common"
  },
  {
    name: "Early Bird",
    description: "Complete a session before 6 AM",
    icon: "🌅",
    category: "time",
    criteria: { type: "timeOfDay", after: "05:00", before: "06:00" },
    rarity: "common"
  },
  {
    name: "Polyglot",
    description: "Work on 5 different projects",
    icon: "🌐",
    category: "projects",
    criteria: { type: "projects", count: 5 },
    rarity: "rare"
  },
  {
    name: "Speed Demon",
    description: "Complete 10 sessions in one day",
    icon: "⚡",
    category: "sessions",
    criteria: { type: "sessionsPerDay", count: 10 },
    rarity: "epic"
  }
];

async function seedBadges() {
  try {
   /*  // Connect to database
    await mongoose.connect(MONGO_URI);
    console.log('Connected to database'); */

    /* // Clear existing badges (optional - remove if you want to keep existing)
    await Badge.deleteMany({});
    console.log('Cleared existing badges'); */

    // Insert all badges
    const createdBadges = await Badge.insertMany(badges);
    console.log(`✅ Successfully seeded ${createdBadges.length} badges`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding badges:', error);
    process.exit(1);
  }
}

// Run the seed function
seedBadges();