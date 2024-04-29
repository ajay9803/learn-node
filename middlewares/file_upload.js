const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd() + '/images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileUploader = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
});

module.exports = fileUploader;

// router.post(
//   "/add-post",
//   fileUploader.single("imageUrl"),
//   feedsController.createPost
// );
