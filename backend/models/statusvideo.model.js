import mongoose from "mongoose";

// Each time a user posts a status video, you create one of these:
//
//  - `user`: reference back to the User.
//  - `videoUrl`: your Cloudinary/S3 URL (or local path).
//  - `createdAt` is auto-set by `timestamps`.
//  - TTL index on createdAt (expireAfterSeconds = 86400 = 24h).
//
const statusVideoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  videoUrl: { type: String, required: true },
}, {
  timestamps: true, // adds createdAt, updatedAt
});

// TTL index: remove  documents 24 h after createdAt
statusVideoSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 });

const StatusVideo = mongoose.model("StatusVideo", statusVideoSchema);
export default StatusVideo;
