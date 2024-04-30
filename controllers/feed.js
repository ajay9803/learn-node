const Post = require("../models/post");
const postValidationSchema = require("../validators/post_validator");
const path = require("path");
exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      if (!posts) {
        const error = new Error("No posts available.");
        error.statusCode = 404;
        throw error;
      } else {
        if (posts.length === 0) {
          const error = new Error("No posts available.");
          error.statusCode = 404;
          throw error;
        }
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
  let image;
  let images = [];

  if (req.files) {
    if (!req.files["imageUrl"]) {
      return res.status(422).json({
        message: "No imageUrl found.",
      });
    }

    if (req.files["images"].length !== 0) {
      req.files["images"].map((theImage) => {
        images.push(path.basename(theImage.filename));
      });
    }
  }
  image = req.files["imageUrl"][0];
  const imageUrl = path.basename(image.filename);
  const { error } = postValidationSchema.validate({
    ...req.body,
    imageUrl: imageUrl,
    images: images,
  });
  if (error) {
    return res.status(422).json({
      message: "Validation failed.",
      error: error.details,
    });
  }

  const { title, content } = req.body;
  const post = new Post({
    title: title,
    content: content,
    creator: { name: "Sagar" },
    imageUrl: imageUrl,
    images: images,
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
  let title = req.body.title;
  let content = req.body.content;
  const postId = req.params.postId;

  let imageUrl;
  let images = [];

  if (req.files) {
    if (!req.files["imageUrl"]) {
      imageUrl = req.body.imageUrl;
    } else {
      imageUrl = path.basename(req.files["imageUrl"][0].filename);
    }

    if (req.files["images"].length !== 0) {
      req.files["images"].map((theImage) => {
        images.push(path.basename(theImage.filename));
      });
    } else {
      images = req.body.images;
    }
  }

  const { error } = postValidationSchema.validate({
    ...req.body,
    imageUrl: imageUrl,
    images: images,
  });
  if (error) {
    return res.status(422).json({
      message: "Validation failed.",
      error: error.details,
    });
  }

  Post.findOneAndUpdate(
    { _id: postId },
    { title: title, content: content, imageUrl: imageUrl, images: images },
    { new: true }
  )
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
