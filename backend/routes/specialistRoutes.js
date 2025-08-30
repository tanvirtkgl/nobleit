import express from "express";
import {
  getSpecialists,
  createSpecialist,
  updateSpecialist,
  deleteSpecialist,
} from "../controllers/specialistController.js";

const router = express.Router();

// Route for listing and creating specialists
router.route("/").get(getSpecialists).post(createSpecialist);

// Route for update and delete by id
router.route("/:id").put(updateSpecialist).delete(deleteSpecialist);

export default router;
