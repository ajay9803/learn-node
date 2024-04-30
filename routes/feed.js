const express = require("express");
const fileUploader = require("../middlewares/file_upload.js");
const isAuth = require("../middlewares/is_auth.js");

const feedsController = require("../controllers/feed");

const router = express.Router();

router.get("/all-posts", isAuth, feedsController.getPosts);
router.post(
  "/add-post",
  isAuth,
  fileUploader.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  feedsController.createPost
);

router.get("/:postId", isAuth, feedsController.getPost);

router.put(
  "/edit-post/:postId",
  isAuth,
  fileUploader.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  feedsController.editPost
);

router.delete("/delete-post/:postId", isAuth, feedsController.deletePost);

module.exports = router;
