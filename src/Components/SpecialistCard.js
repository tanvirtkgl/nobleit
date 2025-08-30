import React from "react";
import "./Specialist.css";

const DEFAULT_PHOTO = "https://via.placeholder.com/250x150.png?text=No+Photo";

const SpecialistCard = ({ specialists }) => {
  if (!specialists || specialists.length === 0) return <p>No specialists available.</p>;

  return (
    <div className="specialist-container">
      {specialists.map((s) => (
        <div key={s._id} className="specialist-card">
          <img src={s.photo || DEFAULT_PHOTO} alt={s.name} />
          <h3>{s.name}</h3>
          <p>{s.details}</p>
          <span className="availability">{s.availability}</span>
        </div>
      ))}
    </div>
  );
};

export default SpecialistCard;
