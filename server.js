const express = require("express");
const fileUpload = require("express-fileupload");
const socketIo = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Routes
const authRoute = require("./src/rotes/authRoute")
const userRoute = require("./src/rotes/userRote")
const chatCtrl = require("./src/rotes/chatRoute")
const messageRoute = require("./src/rotes/messageRoute")
const postRoute = require("./src/rotes/postRoute")
const uploadRoute = require("./src/rotes/uploadRote")

const app = express()

dotenv.config()
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    // origin: "http://localhost:3000",
    // methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 4000;

// to save files for public
app.use(express.static('src/public'))

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
// app.use(fileUpload())

// usage of routes
app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/chat", chatCtrl)
app.use("/message", messageRoute)
app.use("/post", postRoute)
app.use("/upload", uploadRoute)

app.get('/', (req, res)=> {
  res.send('Chat app')
})

let activeUsers = []

io.on('connection', (socket)=> {
  // add new user
  socket.on('new-user-add', (newUserId)=>{
    // if user is not added previously
    if(!activeUsers.some((user)=> user.userId === newUserId)){
      activeUsers.push({userId: newUserId, socketId: socket.id})
      console.log('New user Connected', activeUsers);
    }
    // send all active users to new user
    io.emit('get-users', activeUsers)
  })

  socket.on('disconnect', ()=> {
    // remove user from active users
    activeUsers = activeUsers.filter((user)=> user.socketId !== socket.id)
    console.log('User disconnected!');
    // send all active users to all users
    io.emit('get-users', activeUsers)
  })

  // send message to a specific user
  socket.on("send-message", (data)=> {
    const {receivedId} = data
    const user = activeUsers.find(user => user.userId === receivedId)
    if(user){
      io.to(user.socketId).emit('recieve-message', data)
    }
  })
})

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> {
  server.listen(PORT, ()=> console.log(`Server started on port: ${PORT}`))
}).catch((error) => console.log(error))
