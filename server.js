const express = require("express")
const fileUpload = require("express-fileupload")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

// Routes
const authRoute = require("./src/rotes/authRoute")
const userRoute = require("./src/rotes/userRote")
const chatCtrl = require("./src/rotes/chatRoute")
const messageRoute = require("./src/rotes/messageRoute")
const postRoute = require("./src/rotes/postRoute")
const uploadRoute = require("./src/rotes/uploadRote")

const app = express()

dotenv.config()

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

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> {
  app.listen(PORT, ()=> console.log(`Server started on port: ${PORT}`))
}).catch((error) => console.log(error))
