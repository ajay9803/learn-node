const User = require("../models/user");
const userValidationSchema = require("../validators/user_validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      const theError = new Error("User validation failed.");
      theError.statusCode = 422;
      theError.data = error.details;
      throw theError;
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const theError = new Error("Email already exists.");
        theError.statusCode = 409;
        throw theError;
      } else {
        bcrypt
          .hash(req.body.password, 12)
          .then((hashedPass) => {
            const newUser = new User({
              username: req.body.username,
              email: req.body.email,
              status: req.body.status,
              password: hashedPass,
            });

            newUser
              .save()
              .then((theUser) => {
                res.status(401).json({
                  message: "User created successfully.",
                  user: theUser,
                });
              })
              .catch((e) => {
                if (!e.statusCode) {
                  e.statusCode = 500;
                }
                throw e;
              });
          })
          .catch((e) => {
            next(e);
          });
      }
    }
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const theError = new Error("User couldn't be found.");
      theError.statusCode = 404;
      throw theError;
    }
    const isEqual = await bcrypt.compare(req.body.password, user.password);
    if (!isEqual) {
      const theError = new Error("Please enter the correct password.");
      theError.statusCode = 401;
      throw theError;
    } else {
      const token = await jwt.sign(
        {
          email: user.email,
          userId: user._id.toString(),
        },
        "rino9803",
        {
          expiresIn: "1h",
        }
      );
      res
        .status(200)
        .json({ message: "User login successful.", user: user, token: token });
    }
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};
