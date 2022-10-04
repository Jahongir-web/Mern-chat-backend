const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  likes: [],
  image: {
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

module.exports = mongoose.model("Post", postSchema)