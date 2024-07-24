const catchAsync = require('../util/catchAsync');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRED_IN });
  res.status(201).json({ status: 'success', token, data: { user } });
});

module.exports = signup;