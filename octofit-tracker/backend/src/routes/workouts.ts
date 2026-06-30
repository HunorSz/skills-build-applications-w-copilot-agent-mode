import { Router } from 'express';
import Workout from '../models/workout.js';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  const workouts = await Workout.find()
    .populate('prescribedFor', 'name email')
    .lean();
  res.json({
    resource: 'workouts',
    count: workouts.length,
    items: workouts,
  });
});

export default workoutsRouter;
