import React, { useState } from "react";
import axios from "axios";
import "./Specialist.css";

const DEFAULT_PHOTO = "https://via.placeholder.com/250x150.png?text=No+Photo";

const AdminSpecialist = ({ specialists, setSpecialists }) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [details, setDetails] = useState("");
  const [availability, setAvailability] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, photo: photo || DEFAULT_PHOTO, details, availability };

      if (id) {
        const { data } = await axios.put(`http://localhost:5000/api/specialists/${id}`, payload);
        setSpecialists(specialists.map((s) => (s._id === id ? data : s)));
        alert("✅ Specialist updated!");
      } else {
        const { data } = await axios.post("http://localhost:5000/api/specialists", payload);
        setSpecialists([...specialists, data]);
        alert("✅ Specialist added!");
      }

      // Reset form
      setName(""); setPhoto(""); setDetails(""); setAvailability(""); setId("");
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (s) => {
    setId(s._id);
    setName(s.name);
    setPhoto(s.photo);
    setDetails(s.details);
    setAvailability(s.availability);
  };

  const handleDelete = async (specialistId) => {
    if (!window.confirm("Are you sure you want to delete this specialist?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/specialists/${specialistId}`);
      setSpecialists(specialists.filter((s) => s._id !== specialistId));
      alert("✅ Specialist deleted!");
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="admin-specialist-container">
      <h2>{id ? "Update Specialist" : "Add Specialist"}</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Photo URL (optional)" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        <input type="text" placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} required />
        <input type="text" placeholder="Availability" value={availability} onChange={(e) => setAvailability(e.target.value)} required />
        <button type="submit">{id ? "Update" : "Add"}</button>
      </form>

      <h3>Existing Specialists</h3>
      <div className="specialist-container">
        {specialists.map((s) => (
          <div key={s._id} className="specialist-card">
            <img src={s.photo || DEFAULT_PHOTO} alt={s.name} />
            <h3>{s.name}</h3>
            <p>{s.details}</p>
            <span className="availability">{s.availability}</span>
            <div className="admin-buttons">
              <button onClick={() => handleEdit(s)}>Edit</button>
              <button onClick={() => handleDelete(s._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSpecialist;
