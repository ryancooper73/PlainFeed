# Minimal Social Network

A simple social network application built with Node.js and Express.

## Features

- User registration and authentication
- Create text posts
- Public feed showing all posts
- Session-based authentication
- Simple and clean UI

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser

## Usage

1. Register a new account
2. Login with your credentials
3. Create posts from the home page
4. View all posts in the feed

## Technical Details

- Express.js web framework
- express-session for session management
- bcryptjs for password hashing
- EJS templating engine
- In-memory storage for users and posts