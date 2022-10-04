const router = require("express").Router()

const messageCtrl = require("../controller/messageCtrl")

router.post("/", messageCtrl.addMessage)
router.get("/:chatId", messageCtrl.getMessages)


module.exports = router