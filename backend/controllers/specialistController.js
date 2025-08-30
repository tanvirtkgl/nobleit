import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Specialist from "../models/Specialist.js";

const DEFAULT_PHOTO = "https://via.placeholder.com/250x150.png?text=No+Photo";

// @desc    Get all specialists
// @route   GET /api/specialists
// @access  Public
const getSpecialists = asyncHandler(async (req, res) => {
  const specialists = await Specialist.find({});
  res.json(specialists);
});

// @desc    Create a specialist
// @route   POST /api/specialists
// @access  Admin
const createSpecialist = asyncHandler(async (req, res) => {
  const { name, photo, details, availability } = req.body;

  if (!name || !details || !availability) {
    res.status(400);
    throw new Error("Name, details, and availability are required");
  }

  const specialist = new Specialist({
    name,
    photo: photo || DEFAULT_PHOTO,
    details,
    availability,
  });

  const created = await specialist.save();
  res.status(201).json(created);
});

// @desc    Update a specialist
// @route   PUT /api/specialists/:id
// @access  Admin
const updateSpecialist = asyncHandler(async (req, res) => {
  const { name, photo, details, availability } = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid specialist ID");
  }

  const specialist = await Specialist.findById(id);

  if (!specialist) {
    res.status(404);
    throw new Error("Specialist not found");
  }

  specialist.name = name || specialist.name;
  specialist.photo = photo || specialist.photo || DEFAULT_PHOTO;
  specialist.details = details || specialist.details;
  specialist.availability = availability || specialist.availability;

  const updated = await specialist.save();
  res.json(updated);
});

// @desc    Delete a specialist
// @route   DELETE /api/specialists/:id
// @access  Admin
const deleteSpecialist = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid specialist ID");
  }

  const specialist = await Specialist.findById(id);
  if (!specialist) {
    res.status(404);
    throw new Error("Specialist not found");
  }

  await Specialist.deleteOne({ _id: id });
  res.json({ message: "Specialist removed" });
});

export { getSpecialists, createSpecialist, updateSpecialist, deleteSpecialist };
