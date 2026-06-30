import { Router } from 'express';
import User from '../models/user.js';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  const users = await User.find().populate('team', 'name city points').lean();
  res.json({
    resource: 'users',
    count: users.length,
    items: users,
  });
});

export default usersRouter;
