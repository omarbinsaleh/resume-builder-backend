const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");

// @description   : Create a New Resume
// @route         : POST /api/resume
// @access        : Private
const createResume = async (req, res) => {
   try {
      const { title } = req.body;

      // Default resume template
      const defaultResumeData = {
         profileInfo: {
            profileImg: null,
            profilePreviewUrl: "",
            fullName: "",
            designation: "",
            summary: ""
         },
         contactInfo: {
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            github: "",
            website: ""
         },
         workExperiences: [
            {
               company: "",
               role: "",
               startDate: "",
               endDate: "",
               description: ""
            }
         ],
         education: [
            {
               degree: "",
               institution: "",
               startDate: "",
               endDate: ""
            }
         ],
         skills: [
            {
               name: "",
               progress: 0
            }
         ],
         projects: [
            {
               title: "",
               description: "",
               github: "",
               liveDemo: ""
            }
         ],
         certifications: [
            {
               title: "",
               issuer: "",
               year: ""
            }
         ],
         languages: [
            {
               name: "",
               progress: 0
            }
         ],
         interests: [""],
      };

      // Create a new Resume
      const newResume = await Resume.create({
         userId: req.user._id,
         title,
         ...defaultResumeData
      });

      // send a success message
      res.status(200).json({ success: true, message: 'Resume created successfully', resume: newResume });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Something went wrong. Failed to create resume', error: error.message });
   };
};

// @description    : Get all the resumes for logged-in user
// @route          : GET /api/resume
// @access         : Private
const getUserResumes = async (req, res) => {
   try {
      const userId = req.user._id;
      const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });

      if (resumes) {
         // send a success message
         res.status(200).json({ success: true, message: "User's all resumes returned successfully", resumes });
      } else {
         res.status(200).json({success: false, message: "No resumes created yet", resumes});
      }
   } catch (error) {
      res.status(500).json({ success: false, message: "Something went wrong and Failed to load resumes", error: error.message });
   };
};

// @description     : Get a single resume by ID
// @route           : GET /api/resume/:id
// access           : Private
const getResumeById = async (req, res) => {
   try {
      // send a success message
      res.status(200).json({ success: true, message: "Resume is loaded successfully" })
   } catch (error) {
      res.status(500).json({ success: false, message: "Something went wrong and Failed to load resume", error: error.message });
   };
};

// @description     : Update a resume
// @route           : PUT /api/resume/:id
// @access          : Private
const updateResume = async (req, res) => {
   try {
      // send a success message
      res.status(200).json({ success: true, message: "Resume updated successfully" });
   } catch (error) {
      res.status(500).json({ success: false, message: "Something went wrong and Failed to update the resume", error: error.message });
   };
};

// @description     : Delete a resume
// @route           : DELETE /api/resume/:id
// @access          : Private
const deleteResume = async (req, res) => {
   try {
      // send a success message
      res.status(200).json({ success: true, message: "Resume deleted successfully" });
   } catch (error) {
      res.status(500).json({ success: false, message: "Something went wrong and Failed to delete the resume", error: error.message });
   };
};

module.exports = {
   createResume,
   getUserResumes,
   getResumeById,
   updateResume,
   deleteResume
}
