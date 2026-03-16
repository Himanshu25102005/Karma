const mongoose = require('mongoose');
const Badge = require('../models/badges');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/StravaDB';

const badges = [
  {
    name: "First Step",
    description: "Complete your first focus session",
    icon: "🎯",
    criteria: { criteriaType: "sessions", count: 1 },
    rarity: "common"
  },
  {
    name: "Week Warrior",
    description: "Maintain a 7-day coding streak",
    icon: "🔥",
    criteria: { criteriaType: "streak", count: 7 },
    rarity: "rare"
  },
  {
    name: "Century Club",
    description: "Complete 100 focus sessions",
    icon: "💯",
    criteria: { criteriaType: "sessions", count: 100 },
    rarity: "epic"
  },
  {
    name: "Marathon Runner",
    description: "Complete 300 total minutes of focus time",
    icon: "🏃",
    criteria: { criteriaType: "minutes", count: 300 },
    rarity: "rare"
  },
  {
    name: "Polyglot",
    description: "Work on 5 different projects",
    icon: "🌐",
    criteria: { criteriaType: "projects", count: 5 },
    rarity: "rare"
  },
  {
    name: "Dedication",
    description: "Achieve a 30-day coding streak",
    icon: "🔥",
    criteria: { criteriaType: "streak", count: 30 },
    rarity: "epic"
  },
  {
    name: "Hustler",
    description: "Complete 50 focus sessions",
    icon: "💪",
    criteria: { criteriaType: "sessions", count: 50 },
    rarity: "rare"
  },
  {
    name: "Time Master",
    description: "Accumulate 1000 minutes of focus time",
    icon: "⏰",
    criteria: { criteriaType: "minutes", count: 1000 },
    rarity: "epic"
  },
  {
    name: "Project Juggler",
    description: "Work on 10 different projects",
    icon: "🎪",
    criteria: { criteriaType: "projects", count: 10 },
    rarity: "epic"
  },
  {
    name: "Legendary Focus",
    description: "Complete 500 focus sessions",
    icon: "👑",
    criteria: { criteriaType: "sessions", count: 500 },
    rarity: "legendary"
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