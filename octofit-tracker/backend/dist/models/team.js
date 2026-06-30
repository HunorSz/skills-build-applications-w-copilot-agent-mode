import mongoose from 'mongoose';
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, required: true, default: 0 },
}, { timestamps: true });
const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export default Team;
