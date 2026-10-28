const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const authMiddleware = require('../middleware/auth');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }
});

router.post('/upload', authMiddleware, upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No video file provided' });
    }

    const fileName = `${Date.now()}_${req.file.originalname.replace(/\s+/g, '_')}`;
    const destinationUrl = `${process.env.BUNNY_STORAGE_ENDPOINT}/${fileName}`;

    const response = await axios.put(destinationUrl, req.file.buffer, {
      headers: {
        'AccessKey': process.env.BUNNY_STORAGE_API_KEY,
        'Content-Type': 'application/octet-stream'
      }
    });

    if (response.status === 201 || response.status === 200) {
      const publicCdnUrl = `${process.env.BUNNY_CDN_URL}/${fileName}`;
      return res.status(201).json({
        success: true,
        message: 'Video successfully uploaded to Bunny.net CDN',
        fileName: fileName,
        videoUrl: publicCdnUrl
      });
    } else {
      throw new Error('Failed to store video on Bunny.net');
    }
  } catch (error) {
    console.error('Upload Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
