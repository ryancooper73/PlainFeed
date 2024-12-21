const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// Import routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');

const app = express();
const port = 3000;

// Create required directories
const dirs = [
  path.join(__dirname, 'public'),
  path.join(__dirname, 'public/css'),
  path.join(__dirname, 'public/uploads')
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', postsRouter);

app.listen(port, () => {
  console.log(`PlainFeed running at http://localhost:${port}`);
});