import React, { useEffect, useState } from "react";
import axios from "axios";

function NewsAdmin() {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", image: "" });
  const [editId, setEditId] = useState(null);

  const fetchNews = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/news");
      setNews(data);
    } catch (err) {
      console.error("Failed to fetch news:", err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/news/${editId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/news", form);
      }
      setForm({ title: "", content: "", image: "" });
      setEditId(null);
      fetchNews();
    } catch (err) {
      console.error("Failed to save news:", err);
    }
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, content: item.content, image: item.image });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/news/${id}`);
      fetchNews();
    } catch (err) {
      console.error("Failed to delete news:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage News</h2>
      <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded shadow">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? "Update News" : "Add News"}
        </button>
      </form>

      <ul>
        {news.map((item) => (
          <li key={item._id} className="flex justify-between items-center border-b py-2">
            <span>{item.title}</span>
            <div>
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsAdmin;
