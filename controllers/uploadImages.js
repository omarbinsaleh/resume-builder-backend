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

module.exports = {uploadImage};