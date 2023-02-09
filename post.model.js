const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = PostModel = mongoose.model("postModel", PostSchema);
