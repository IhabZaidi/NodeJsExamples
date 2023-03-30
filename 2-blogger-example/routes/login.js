const express = require('express');
const jwt = require('jsonwebtoken');
const users = require("./data");
const router = express.Router();



// Login user
router.post('', (req, res) => {
    const { email, password } = req.body;
    console.log(users);
    // Check if user exists
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '2h' });
    user.token = token;
    user.lastLoginDate = new Date().toISOString();
    res.json({ message: 'User logged in successfully', token });
});


// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = users.find(user => user.id === decoded.id && user.email === decoded.email && user.token === token);
        if (!req.user) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = router;
