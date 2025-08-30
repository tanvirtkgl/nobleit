import mongoose from "mongoose";

const newsSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/300x200.png?text=No+Image",
    },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);
export default News;
