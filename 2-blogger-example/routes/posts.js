const express = require('express');
const users = require("./data");
const router = express.Router();
const jwt = require('jsonwebtoken');

// Posts model
const posts = [];

router.get('', (req, res) => {
  res.json(posts);
});


// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }
  const token = authHeader.split(' ')[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, 'secret');
    console.log(users);
    req.user = users.find(user => user.id === decoded.id && user.email === decoded.email && user.token === token);
    if (!req.user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};


// Create new post
router.post('', isAuthenticated, (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  // Check user's post count for the day
  const userPosts = posts.filter(post => post.userId === userId && isToday(post.createdAt));
  if (userPosts.length >= 10) {
    return res.status(400).json({ error: 'User has reached the daily post limit' });
  }
  // Create new post
  const id = posts.length + 1;
  const createdAt = new Date().toISOString();
  const newPost = {
    id,
    userId,
    title,
    content,
    createdAt,
    likes: [],
  };
  posts.push(newPost);

  res.json({ message: 'Post created successfully', post: newPost });
});

// Like a post
router.post('/:id/like', isAuthenticated, (req, res) => {
  const postId = Number(req.params.id);
  const userId = req.user.id;

  // Check if post exists
  const post = posts.find(post => post.id === postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  // Check if user has already liked the post
  if (post.likes.includes(userId)) {
    return res.status(400).json({ error: 'User has already liked the post' });
  }
  // Like post
  post.likes.push(userId);
  res.json({ message: 'Post liked successfully' });
});

// Helper function to check if date is today
const isToday = date => {
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

// Edit a post
router.put('/:id', isAuthenticated, (req, res) => {
  const postId = Number(req.params.id);
  const userId = req.user.id;
  const { title, content } = req.body;
  // Check if post exists
  const post = posts.find(post => post.id === postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  // Check if user is the owner of the post
  if (post.userId !== userId) {
    return res.status(403).json({ error: 'User is not authorized to edit this post' });
  }
  // Update post
  post.title = title || post.title;
  post.content = content || post.content;
  res.json({ message: 'Post updated successfully', post });
});

// Delete a post
router.delete('/:id', isAuthenticated, (req, res) => {
  const postId = Number(req.params.id);
  const userId = req.user.id;
  // Check if post exists
  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  // Check if user is the owner of the post
  if (posts[postIndex].userId !== userId) {
    return res.status(403).json({ error: 'User is not authorized to delete this post' });
  }
  // Delete post
  posts.splice(postIndex, 1);
  res.json({ message: 'Post deleted successfully' });
});




module.exports = router;