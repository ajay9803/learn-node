const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      if (!posts) {
        const error = new Error("Couldn't find post");
        error.statusCode = 404;
        throw error;
      } else {
        res.status(200).json({
          message: "Posts fetched successfully.",
          posts: posts,
        });
      }
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send({
      message: "Validation Failed",
      errors: errors.array(),
    });
  }
  if (!req.file) {
    console.log("File not found");
    const error = new Error("File not found.");
    error.statusCode = 422;
    throw error;
  }
  console.log(req.file);
  const imageUrl = req.file.path;

  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    creator: { name: "Sagar" },
    imageUrl: imageUrl,
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully",
        post: result,
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({ message: "Error occurred." });
    });
  // create post in db
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Couldn't find post");
        error.statusCode = 404;
        throw error;
      } else {
        res.status(200).json({
          message: "Post fetched successfully.",
          post: post,
        });
      }
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};
