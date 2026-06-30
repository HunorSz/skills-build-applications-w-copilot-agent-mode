import express from 'express';
import mongoose from 'mongoose';

const app = express();

const PORT = Number(process.env.PORT) || 8000;
const MONGO_PORT = Number(process.env.MONGO_PORT) || 27017;
const MONGO_DB = process.env.MONGO_DB || 'octofit_db';
const MONGO_URI =
  process.env.MONGO_URI || `mongodb://127.0.0.1:${MONGO_PORT}/${MONGO_DB}`;

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    backendPort: PORT,
    mongoPort: MONGO_PORT,
  });
});

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Backend API running on http://localhost:${PORT}`);
      console.log(`MongoDB connection: ${MONGO_URI}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void startServer();
