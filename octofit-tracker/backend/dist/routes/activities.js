import { Router } from 'express';
import Activity from '../models/activity.js';
const activitiesRouter = Router();
activitiesRouter.get('/', async (_req, res) => {
    const activities = await Activity.find()
        .populate('user', 'name email')
        .sort({ date: -1 })
        .lean();
    res.json({
        resource: 'activities',
        count: activities.length,
        items: activities,
    });
});
export default activitiesRouter;
