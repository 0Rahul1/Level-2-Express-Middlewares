const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.dbgdbruyb,
  api_key: process.env.819174762313849,
  api_secret: process.env.WPab7a16WZsjTwEMt9CZaa9-APw
});
const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.dbgdbruyb,
  api_key: process.env.819174762313849,
  api_secret: process.env.WPab7a16WZsjTwEMt9CZaa9-APw
});

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'jpg', // supports promises as well
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname)));

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file && req.file.path) {
    res.status(200).json({
      message: 'file uploaded successfully',
      imageUrl: req.file.path,
    });
  } else {
    res.status(500).json({
      message: 'file upload failed',
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
