const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");

// @description   : Create a New Resume
// @route         : POST /api/resume
// @access        : Private
const createResume = async (req, res) => {
   try {
      // send a success message
      res.status(200).json({success: true, message: 'Resume created successfully'});
   } catch (error) {
      res.status(500).json({success: false, message: 'Something went wrong. Failed to create resume', error: error.message});
   };
};

// @description    : Get all the resumes for logged-in user
// @route          : GET /api/resume
// @access         : Private
const getUserResumes = async (req, res) => {
   try {
      // send a success message
      res.status(200).json({success: true, message: "User's all resumes returned successfully"});
   } catch (error) {
      res.status(500).json({success: false, message: "Something went wrong and Failed to load resumes", error: error.message});
   };
};

// @description     : Get a single resume by ID
// @route           : GET /api/resume/:id
// access           : Private
const getResumeById = async (req, res) => {
   try {
      // send a success message
      res.status(200).json({success: true, message: "Resume is loaded successfully"})  
   } catch (error) {
      res.status(500).json({success: false, message: "Something went wrong and Failed to load resume", error: error.message});
   };
};

// @description     : Update a resume
// @route           : PUT /api/resume/:id
// @access          : Private
const updateResume = async (req, res) => {
   try {
      // send a success message
      res.status(200).json({success: true, message: "Resume updated successfully"});
   } catch (error) {
      res.status(500).json({success: false, message: "Something went wrong and Failed to update the resume", error: error.message});
   };
};

// @description     : Delete a resume
// @route           : DELETE /api/resume/:id
// @access          : Private
const deleteResume = async (req, res) => {
   try {
      // send a success message
      res.status(200).json({success: true, message: "Resume deleted successfully"});
   } catch (error) {
      res.status(500).json({success: false, message: "Something went wrong and Failed to delete the resume", error: error.message});
   };
};

module.exports = {
   createResume,
   getUserResumes,
   getResumeById,
   updateResume,
   deleteResume
}
