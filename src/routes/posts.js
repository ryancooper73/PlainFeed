const express = require('express');
const { requireAuth } = require('../middleware/auth');
const upload = require('../config/multer');
const { posts } = require('../config/database');
const { validatePost } = require('../services/moderation');

const router = express.Router();

router.get('/create-post', requireAuth, (req, res) => {
  res.render('create-post', { user: req.session.user, error: null });
});

router.post('/create-post', requireAuth, upload.single('image'), (req, res) => {
  const { content } = req.body;
  
  const validation = validatePost(content);
  if (!validation.valid) {
    // If there's an uploaded image, we should clean it up
    if (req.file) {
      const fs = require('fs');
      fs.unlinkSync(req.file.path);
    }
    return res.render('create-post', { 
      user: req.session.user, 
      error: validation.reason 
    });
  }

  posts.push({
    content,
    author: req.session.user,
    timestamp: Date.now(),
    image: req.file ? `/uploads/${req.file.filename}` : null
  });
  res.redirect('/');
});

module.exports = router;