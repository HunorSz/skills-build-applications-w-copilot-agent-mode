import mongoose from 'mongoose';
const activitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMin: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, required: true },
}, { timestamps: true });
const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export default Activity;
