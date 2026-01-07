const chatSchema = new mongoose.Schema({
    isGroupChat: { type: Boolean, default: false },
    name: { type: String }, // group name (if group)
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // only for groups
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Chat', chatSchema);
  