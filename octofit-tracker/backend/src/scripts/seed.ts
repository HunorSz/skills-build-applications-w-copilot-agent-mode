import mongoose from 'mongoose';
import { MONGO_URI } from '../config/database.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');
  console.log(`Using MongoDB URI: ${MONGO_URI}`);

  await mongoose.connect(MONGO_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Alex Kim',
      email: 'alex.kim@octofit.local',
      age: 28,
      fitnessLevel: 'advanced',
    },
    {
      name: 'Maya Singh',
      email: 'maya.singh@octofit.local',
      age: 31,
      fitnessLevel: 'intermediate',
    },
    {
      name: 'Jordan Lee',
      email: 'jordan.lee@octofit.local',
      age: 24,
      fitnessLevel: 'beginner',
    },
    {
      name: 'Sofia Alvarez',
      email: 'sofia.alvarez@octofit.local',
      age: 35,
      fitnessLevel: 'advanced',
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Pace Setters',
      city: 'Seattle',
      members: [users[0]._id, users[1]._id],
      points: 420,
    },
    {
      name: 'Core Crushers',
      city: 'Austin',
      members: [users[2]._id, users[3]._id],
      points: 380,
    },
  ]);

  await User.updateMany(
    { _id: { $in: [users[0]._id, users[1]._id] } },
    { $set: { team: teams[0]._id } }
  );
  await User.updateMany(
    { _id: { $in: [users[2]._id, users[3]._id] } },
    { $set: { team: teams[1]._id } }
  );

  await Activity.insertMany([
    {
      user: users[0]._id,
      type: 'HIIT Run',
      durationMin: 35,
      calories: 410,
      date: new Date('2026-06-24T07:15:00Z'),
    },
    {
      user: users[1]._id,
      type: 'Strength Training',
      durationMin: 50,
      calories: 360,
      date: new Date('2026-06-25T18:00:00Z'),
    },
    {
      user: users[2]._id,
      type: 'Cycling',
      durationMin: 40,
      calories: 300,
      date: new Date('2026-06-26T12:30:00Z'),
    },
    {
      user: users[3]._id,
      type: 'Swimming',
      durationMin: 45,
      calories: 390,
      date: new Date('2026-06-27T06:45:00Z'),
    },
    {
      user: users[0]._id,
      type: 'Mobility',
      durationMin: 20,
      calories: 110,
      date: new Date('2026-06-28T20:10:00Z'),
    },
  ]);

  await Leaderboard.insertMany([
    {
      user: users[0]._id,
      score: 975,
      rank: 1,
      period: 'weekly',
    },
    {
      user: users[3]._id,
      score: 910,
      rank: 2,
      period: 'weekly',
    },
    {
      user: users[1]._id,
      score: 860,
      rank: 3,
      period: 'weekly',
    },
    {
      user: users[2]._id,
      score: 780,
      rank: 4,
      period: 'weekly',
    },
  ]);

  await Workout.insertMany([
    {
      title: 'Explosive Lower Body Circuit',
      level: 'advanced',
      durationMin: 45,
      focusAreas: ['legs', 'glutes', 'conditioning'],
      prescribedFor: users[0]._id,
    },
    {
      title: 'Upper Body Power Builder',
      level: 'intermediate',
      durationMin: 40,
      focusAreas: ['chest', 'back', 'arms'],
      prescribedFor: users[1]._id,
    },
    {
      title: 'Starter Full-Body Flow',
      level: 'beginner',
      durationMin: 30,
      focusAreas: ['core', 'mobility', 'balance'],
      prescribedFor: users[2]._id,
    },
    {
      title: 'Endurance Swim Prep',
      level: 'advanced',
      durationMin: 50,
      focusAreas: ['shoulders', 'core', 'cardio'],
      prescribedFor: users[3]._id,
    },
  ]);

  console.log('Seed complete: users, teams, activities, leaderboard, workouts');
  await mongoose.disconnect();
}

seedDatabase().catch(async (error) => {
  console.error('Seed failed:', error);
  await mongoose.disconnect();
  process.exit(1);
});
