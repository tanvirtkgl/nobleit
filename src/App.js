import React, { useState, useEffect } from "react";
import Auth from "./Components/Auth";
import SpecialistCard from "./Components/SpecialistCard";
import AdminSpecialist from "./Components/AdminSpecialist";
import NewsAdmin from "./Components/NewsAdmin";
import NewsList from "./Components/NewsList";
import axios from "axios";
import "./App.css";

function App() {
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/specialists");
        setSpecialists(data);
      } catch (err) {
        console.error("Failed to fetch specialists:", err);
      }
    };
    fetchSpecialists();
  }, []);

  return (
    <div className="App">
      {/* Existing Specialist Management */}
      <AdminSpecialist specialists={specialists} setSpecialists={setSpecialists} />
      <SpecialistCard specialists={specialists} />

      {/* 👇 Added News Components */}
      <NewsAdmin />
      <NewsList />

      {/* Existing Auth */}
      <Auth />
    </div>
  );
}

export default App;
