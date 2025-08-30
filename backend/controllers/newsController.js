import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import News from "../models/News.js";

// @desc Get all news
// @route GET /api/news
// @access Public
const getNews = asyncHandler(async (req, res) => {
  const news = await News.find({}).sort({ createdAt: -1 });
  res.json(news);
});

// @desc Create news
// @route POST /api/news
// @access Admin
const createNews = asyncHandler(async (req, res) => {
  const { title, content, image } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Title and content are required");
  }

  const news = new News({
    title,
    content,
    image: image || undefined,
  });

  const created = await news.save();
  res.status(201).json(created);
});

// @desc Update news
// @route PUT /api/news/:id
// @access Admin
const updateNews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid news ID");
  }

  const news = await News.findById(id);

  if (!news) {
    res.status(404);
    throw new Error("News not found");
  }

  news.title = title || news.title;
  news.content = content || news.content;
  news.image = image || news.image;

  const updated = await news.save();
  res.json(updated);
});

// @desc Delete news
// @route DELETE /api/news/:id
// @access Admin
const deleteNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid news ID");
  }

  const news = await News.findById(id);
  if (!news) {
    res.status(404);
    throw new Error("News not found");
  }

  await News.deleteOne({ _id: id });
  res.json({ message: "News deleted" });
});

export { getNews, createNews, updateNews, deleteNews };
