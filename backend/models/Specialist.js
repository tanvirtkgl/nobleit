import mongoose from "mongoose";

const specialistSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    photo: { 
      type: String, 
      required: true, 
      default: "https://via.placeholder.com/250x150.png?text=No+Photo" // default image URL
    },
    details: { type: String, required: true },
    availability: { type: String, required: true },
  },
  { timestamps: true }
);

const Specialist = mongoose.model("Specialist", specialistSchema);
export default Specialist;
