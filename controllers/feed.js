const Post = require("../models/post");
const postValidationSchema = require("../validators/post_validator");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      if (!posts) {
        const error = new Error("No posts available.");
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
      res.status(e.statusCode).json({
        message: e.message,
      });
    });
};

exports.createPost = (req, res, next) => {
  const { error } = postValidationSchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      message: "Validation failed.",
      error: error.details,
    });
  }

  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    creator: { name: "Sagar" },
    imageUrl: "dummy.png",
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully.",
        post: result,
      });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }

      next(e);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Couldn't find post.");
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
      console.log("yeta error");
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      res.status(e.statusCode).json({
        message: e.message,
      });
    });
};

exports.editPost = async (req, res, next) => {
  console.log("idhar");
  let title = req.body.title;
  let content = req.body.content;
  const postId = req.params.postId;
  let post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "No post found.",
    });
  }

  post.title = title;
  post.content = content;
  post
    .save()
    .then((post) => {
      res.status(200).json({
        message: "Post updated successfully.",
        post: post,
      });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      res.status(e.statusCode).json({
        message: e.message,
      });
    });
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then((post) => {
      post.deleteOne().then((post) => {
        res.status(204).json({
          message: "Post deleted successfully.",
        });
      });
    })
    .catch((e) => {
      res.status(404).json({
        message: "Post not found.",
      });
    });
};
