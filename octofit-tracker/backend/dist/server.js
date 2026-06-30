import express from 'express';
import cors from 'cors';
import { MONGO_URI, connectToDatabase } from './config/database.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';
const app = express();
const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express.json());
app.use(cors());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        apiBaseUrl,
        backendPort: PORT,
        mongoUri: MONGO_URI,
    });
});
export async function startServer() {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log(`Backend API running on ${apiBaseUrl}`);
            console.log(`MongoDB connection: ${MONGO_URI}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
