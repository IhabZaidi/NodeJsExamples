const express = require('express');
const jwt = require('jsonwebtoken');
const users = require("./data");
const router = express.Router();


// Register new user
router.post('', (req, res) => {
    const { fullName, username, email, password } = req.body;
    // Check if user already exists
    const user = users.find(user => user.email === email);
    if (user) {
        return res.status(409).json({ error: 'User already exists' });
    }
    // Create new user
    const id = users.length + 1;
    const registerDate = new Date().toISOString();
    const newUser = {
        id,
        fullName,
        username,
        email,
        password,
        registerDate,
        lastLoginDate: null,
        token: null,
        postsCount: 0,
    };
    users.push(newUser);

    res.json({ message: 'User registered successfully' });
});


module.exports = router;
