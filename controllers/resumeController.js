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
         res.status(200).json({ success: false, message: "No resumes created yet", resumes });
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
      const resumeId = req.params.id;
      const userId = req.user._id;

      // find resume using the resume ID and user ID
      const resume = await Resume.findOne({ _id: resumeId, userId });

      // send response with a message, when no resume is found
      if (!resume) {
         return res.status(404).json({ success: false, message: "Resume not found", resume });
      }

      // send a success message
      res.status(200).json({ success: true, message: "Resume is loaded successfully", resume })
   } catch (error) {
      res.status(500).json({ success: false, message: "Something went wrong and Failed to load resume", error: error.message });
   };
};

// @description     : Update a resume
// @route           : PUT /api/resume/:id
// @access          : Private
const updateResume = async (req, res) => {
   try {
      const resumeId = req.params.id;
      const userId = req.user._id;

      // extract the existing resume data from the database
      const resume = await Resume.findOne({ _id: resumeId, userId });

      // validate if the resume with the provided ID and user ID exists in the database
      if (!resume) {
         return res.status(404).json({ success: false, message: "Resume not found or unauthorized" });
      };

      // merge updated resume or information into the existing resume information
      const updatedInfo = req.body || resume;
      Object.assign(resume, updatedInfo);

      // save the updated resume
      const savedResume = await resume.save();

      // send a success message
      res.status(200).json({ success: true, message: "Resume updated successfully", resume: savedResume });
   } catch (error) {
      res.status(500).json({ success: false, message: "Something went wrong and Failed to update the resume", error: error.message });
   };
};

// @description     : Delete a resume
// @route           : DELETE /api/resume/:id
// @access          : Private
const deleteResume = async (req, res) => {
   try {
      const resumeId = req.params.id;
      const userId = req.user._id;

      // find the existing resume with the resume ID and the user Id provided;
      const resume = await Resume.findOne({ _id: resumeId, userId });

      if (!resume) {
         return res.status(404).json({ success: false, message: "Resume not found or unauthorized" });
      };

      // delete thumbnail link and profile preview url image from the upload folder
      const uploadFolder = path.join(__dirname, '..', 'uploads');
      const baseUrl = `${req.protocol}://${req.get('host')}`;

      if (resume.thumbnailLink) {
         const oldThumbnailLink = path.join(uploadFolder, path.basename(resume.thumbnailLink));
         if (fs.existsSync(oldThumbnailLink)) {
            fs.unlinkSync(oldThumbnailLink);
         };
      };

      if (resume.profileInfo?.profilePreviewUrl) {
         const oldProfile = path.join(uploadFolder, path.basename(resume.profileInfo.profilePreviewUrl));
         if (fs.existsSync(oldProfile)) {
            fs.unlink(oldProfile);
         };
      };

      // delete the existing resume 
      const deletedResume = await Resume.findOneAndDelete({ _id: resumeId, userId }); // this function returns the deleted document if deleted successfully and otherwise returns null

      if (!deletedResume) {
         return res.status(404).json({ success: false, message: "Resume not found or unauthorized" });
      };

      // send a success message
      res.status(200).json({ success: true, message: "Resume deleted successfully", deletedResume });
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
