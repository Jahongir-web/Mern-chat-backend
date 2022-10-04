const Chat = require("../models/chatModel")

const chatCtrl = {
  // Create a Chat
  createChat: async (req, res) => {
    try {
      const {senderId, receviedId} = req.body

      const newChat = new Chat({members: [senderId, receviedId]})
      await newChat.save()
      res.status(201).json(newChat)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  },

  // Chat List
  userChats: async (req, res) => {
    try {
      const {userId} = req.body
      const chats = await Chat.find({members: {$in: [userId]}})
      res.status(200).json(chats)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  },

  // find Chat
  findChat: async (req, res) => {
    try {
      const {firstId, secondId} = req.params
      const chat = await Chat.find({members: {$all: [firstId, secondId]}})

      res.status(200).json(chat)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  },

  // Delete a Chat
}

module.exports = chatCtrl