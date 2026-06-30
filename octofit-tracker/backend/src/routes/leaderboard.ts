import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find()
    .populate('user', 'name email')
    .sort({ rank: 1 })
    .lean();
  res.json({
    resource: 'leaderboard',
    count: leaderboard.length,
    items: leaderboard,
  });
});

export default leaderboardRouter;
