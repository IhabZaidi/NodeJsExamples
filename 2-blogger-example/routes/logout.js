const express = require('express');
const jwt = require('jsonwebtoken');
const users = require("./data");
const router = express.Router();


// Logout user
router.post('', (req, res) => {
    const userId = req.user.id;
    // Clear user's token
    const user = users.find(user => user.id === userId);
    user.token = null;
    res.json({ message: 'User logged out successfully' });
});


module.exports = router;
