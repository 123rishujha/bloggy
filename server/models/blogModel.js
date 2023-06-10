const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    title: { type: String, default: "untitled" },
    coverImage: { type: String },
    content: { type: Object },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = {
  BlogModel,
};
