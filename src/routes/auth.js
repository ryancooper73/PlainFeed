const express = require('express');
const bcrypt = require('bcryptjs');
const { users } = require('../config/database');

const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  if (users.has(username)) {
    return res.render('register', { error: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.set(username, { username, password: hashedPassword });
  
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.get(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render('login', { error: 'Invalid username or password' });
  }

  req.session.user = username;
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;