const express = require("express");
const { body } = require("express-validator");
const fileUploader = require("../middlewares/file_upload.js");

const feedsController = require("../controllers/feed");

const router = express.Router();

router.get("/posts", feedsController.getPosts);
router.post(
  "/add-post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 10 }),
  ],
  fileUploader.single("image"),
  feedsController.createPost,
);

router.get("/posts/:postId", feedsController.getPost);

module.exports = router;
