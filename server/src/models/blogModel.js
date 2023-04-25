const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: { type: String, trim: true, required: true, unique: true },

    description: { type: String, trim: true, required: true },

    image: { type: String, trim: true, required: true },

    slug: { type: String, required: true },

      },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);

module.exports = Blog;
