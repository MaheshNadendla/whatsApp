const statusSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    mediaUrl: { type: String },
    caption: { type: String },
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    expiresAt: { type: Date }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Status', statusSchema);
  