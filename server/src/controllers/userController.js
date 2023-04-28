const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const dev = require('../config');

const registerUser = async (req, res, next) => {
  try {
    //getting data from req
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone)
      throw createError(404, "name, email, password or phone is missing");

    if (password.length < 5)
      throw createError(400, "passoword length should be atleast 5");

    const image = req.file;
    if (image && image.size > Math.pow(1024, 2))
      throw createError(400, "File size should be less than 1MB");

    const user = await User.findOne({ email });
    if (user) throw createError(400, "user already exist, Please sign in");

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const token = jwt.sign({...req.body, password:hashedPassword, image:image.path}, dev.app.)
    const emailData = {
      email,
      subject: "Account activation email",
      html: `
            <h2> Hello ${name}! </h2>
            <p> Please click here to <a href = "${dev.app.clientUrl}/api/users/activate?token =${token}"
            target = "_blank">activate your account </a> </p>`, //html body
    };

    sendEmailWithNodeMailer(emailData);

    return successHandler(
      res,
      200,
      `Please check your mail:${email} for completing your sign in process`,
      { token: token }
    );
  } catch (error) {
    next(error);
  }
};