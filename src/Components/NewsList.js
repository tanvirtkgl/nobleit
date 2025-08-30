import React, { useEffect, useState } from "react";
import axios from "axios";

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/news");
        setNews(data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((item) => (
          <div key={item._id} className="border rounded-lg shadow p-4 bg-white">
            <img
              src={item.image || "https://via.placeholder.com/400x200.png?text=No+Image"}
              alt={item.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-3">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">{item.content}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(item.publishedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsList;
