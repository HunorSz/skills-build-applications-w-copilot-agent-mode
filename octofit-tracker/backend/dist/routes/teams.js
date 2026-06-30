import { Router } from 'express';
import Team from '../models/team.js';
const teamsRouter = Router();
teamsRouter.get('/', async (_req, res) => {
    const teams = await Team.find().populate('members', 'name email').lean();
    res.json({
        resource: 'teams',
        count: teams.length,
        items: teams,
    });
});
export default teamsRouter;
