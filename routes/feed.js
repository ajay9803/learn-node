const express = require("express");
const { body } = require("express-validator");
// const fileUploader = require("../middlewares/file_upload.js");

const feedsController = require("../controllers/feed");

const router = express.Router();

router.get("/posts", feedsController.getPosts);
router.post(
  "/add-post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 10 }),
  ],
  feedsController.createPost
);

router.get("/posts/:postId", feedsController.getPost);

router.put("/posts/edit-post/:postId", feedsController.editPost);

router.delete("/posts/delete-post/:postId", feedsController.deletePost);

module.exports = router;
