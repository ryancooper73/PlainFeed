const express = require('express');
const { requireAuth } = require('../middleware/auth');
const upload = require('../config/multer');
const { posts } = require('../config/database');

const router = express.Router();

router.get('/create-post', requireAuth, (req, res) => {
  res.render('create-post', { user: req.session.user });
});

router.post('/create-post', requireAuth, upload.single('image'), (req, res) => {
  const { content } = req.body;
  posts.push({
    content,
    author: req.session.user,
    timestamp: Date.now(),
    image: req.file ? `/uploads/${req.file.filename}` : null
  });
  res.redirect('/');
});

module.exports = router;