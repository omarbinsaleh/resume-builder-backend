const fs = require('fs');
const path = require('path');
const Resume = require('../models/Resume');

// @description   : Upload image
// @routes        : POST /auth/api/upload-image
// @access        : Public
const uploadImage = (req, res) => {
   if (!req.file) {
      return res.status(400).json({success: false, message: 'No file uploaded'});
   };

   const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
   res.status(200).json({success: true, message: 'File uploaded successsfully', imageUrl});
};

// @description   : Upload resume image
// @routes        : PUT /api/resume
// @access        : Private
const uploadResumeImage = async (req, res) => {
   try {
      const resumeId = req.params.id;
      const userId = req.user._id;
      const resume = await Resume.findOne({_id: resumeId, userId});

      // check if the resume is found
      if (!resume) {
         return res.status(404).json({success: false, message: 'Resume not found or unauthorized'});
      };

      const uploadFolder = path.json(__dirname, '..', 'uploads');
      const baseUrl = `${res.protocol}://${req.get('host')}`;

      const newThumbnail = req.files.thumbnail?.[0];
      const newProfileImage = req.files.profileImage?.[0]; 

      // check if new thumbnail is uploaded
      // if a new thumbnail is uploaded, then delete the old one
      if (newThumbnail) {
         if (resume.thumbnailLink) {
            const oldThumbnailLink = path.join(uploadFolder, path.basename(resume.thumbnailLink));
            if (fs.existsSync(oldThumbnailLink)) {
               fs.unlinkSync(oldThumbnailLink);
            };
         };

         resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
      };

      // check if the profile image is uploaded
      // if a new profile image is uploaded, then delete the old one
      if (newProfileImage) {
         if (resume.profileInfo.profilePreviewUrl) {
            const oldProfileImage = path.join(uploadFolder, path.basename(resume.profileInfo.profilePreviewUrl));
            if (fs.existsSync(oldProfileImage)) {
               fs.unlinkSync(oldProfileImage);
            };
         };

         resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
      };

      // save the resume with the latest images
      await resume.save();

      // send success message
      res.status(200).json({success: true, message: 'Image uploaded successfully', resume});

   } catch (error) {
      res.status(500).json({success: false, message: 'Something went wrong and Failed to upload image', error: error.message});
   }
}

module.exports = {uploadImage, uploadResumeImage};