const router = require("express").Router()

const auth = require("../middleware/authMiddleware")
const chatCtrl = require("../controller/chatCtrl")

router.post("/", chatCtrl.createChat)
router.get("/", auth, chatCtrl.userChats)
router.get("/:firstId/:secondId", chatCtrl.findChat)

module.exports = router