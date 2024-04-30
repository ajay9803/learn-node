const express = require("express");
const fileUploader = require("../middlewares/file_upload.js");

const feedsController = require("../controllers/feed");

const router = express.Router();

router.get("/posts", feedsController.getPosts);
router.post(
  "/add-post",
  fileUploader.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  feedsController.createPost
);

router.get("/posts/:postId", feedsController.getPost);

router.put("/posts/edit-post/:postId", feedsController.editPost);

router.delete("/posts/delete-post/:postId", feedsController.deletePost);

module.exports = router;
