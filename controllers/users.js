const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();
const { createUserToken } = require('../middleware/auth');


router.get('/', (req, res, next) => {
    User.find()
        .then((users)=>res.json(users))
        .catch(next);
});
// SIGN UP
// POST /api/signup
router.post('/signup', async (req, res, next) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            email: req.body.email,
            password
        });
        res.status(201).json(user);
    } catch (error) {
        return next(error);
    }
});

// SIGN IN
// POST /api/signin
router.post('/signin', (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then((user) => createUserToken(req, user))
      .then((token) => res.json({ token }))
      .catch(next);
  });
  

module.exports = router;