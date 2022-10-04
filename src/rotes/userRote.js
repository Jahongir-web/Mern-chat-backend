const router = require("express").Router()
const auth = require("../middleware/authMiddleware")

const userCtrl = require("../controller/userCtrl")

router.get("/:id", userCtrl.getUser)
router.get("/", userCtrl.getAllUser)
router.put("/:id", auth, userCtrl.updateUser)
router.delete("/:id", auth, userCtrl.deleteUser)
router.put("/:id/follow", auth, userCtrl.followUser)
router.put("/:id/unfollow", auth, userCtrl.unfollowUser)



module.exports = router