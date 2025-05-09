const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { createResume, getUserResumes, getResumeById, updateResume, deleteResume } = require("../controllers/resumeController");
const resumeRouter = express.Router();

// Resume Routes
resumeRouter.post('/', protect, createResume); // Create a new resume
resumeRouter.get('/', protect, getUserResumes); // Get the logged-in user's resumes
resumeRouter.get('/:id', protect, getResumeById) // Get a single resume by ID
resumeRouter.put('/:id', protect, updateResume); // Update a single resume
resumeRouter.delete('/:id', protect, deleteResume) // Delete a single resume

module.exports = resumeRouter;