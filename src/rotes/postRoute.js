const router = require("express").Router()
const auth = require("../middleware/authMiddleware")

const postCtrl = require("../controller/postCtrl")


router.post("/", postCtrl.createPost)
router.get("/:id", postCtrl.getPost)
router.put("/:id", auth, postCtrl.updatePost)
router.delete("/:id", auth, postCtrl.deletePost)
router.put("/:id/like", auth, postCtrl.likePost)
router.get("/:id/timeline", postCtrl.getTimelinePosts)



module.exports = router