const { validationResult } = require("express-validator");
const Post = require("../models/post");
exports.getPosts = (req, res, next) => {
  const posts = Post.findAll();
  res.status(200).json({
    posts: [
      {
        _id: "1123434566",
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "images/duck.jpg",
        creator: {
          name: "Mujjuni Brian",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed,entered data is incorrect")
    error.statusCode = 422
    throw error;
  }
  const {title,content} = req.body;

  // Create post in db
  const post = new Post({
    title: title,
    content: content,
    imageUrl: 'images/duck.jpg',
    creator: { name: "Mujjuni Brian" },
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => {
      if(!err.statusCode){
        err.statusCode = 500
      }
      next(err)
    });
};
