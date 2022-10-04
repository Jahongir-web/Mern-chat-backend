const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
},
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Message", messageSchema)