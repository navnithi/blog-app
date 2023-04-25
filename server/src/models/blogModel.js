const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: { type: String, trim: true, required: true, unique: true },

    slug: { type: String, required: true },

    description: { type: String, trim: true, required: true, minlength: 3 },

    image: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);

module.exports = Blog;
