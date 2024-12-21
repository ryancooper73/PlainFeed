const express = require('express');
const { posts } = require('../config/database');

const router = express.Router();

router.get('/', (req, res) => {
  const sortedPosts = [...posts].sort((a, b) => b.timestamp - a.timestamp);
  res.render('feed', { 
    posts: sortedPosts, 
    user: req.session.user 
  });
});

module.exports = router;