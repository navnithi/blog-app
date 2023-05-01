const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const dev = require('../config');
const { sendEmailWithNodeMailer } = require('../helper/sendEmail');
const { successHandler } = require('./requestHandler');

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

    const token = jwt.sign({...req.body, password:hashedPassword, image:image.path}, 
        String(dev.app.jwtActivationSecretKey), {expiresIn: '10m'})


    const emailData = {
      email,
      subject: "Account activation email",
      html: `
            <h2> Hello ${name}! </h2>
            <p> Please click here to <a href = "${dev.app.clientUrl}/api/users/activate/${token}"
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

const verifyEmail = async (req, res, next) => {
  try {
    const token = req.body.token;
    console.log("Verify Email :", token)
    if (!token) throw createError(404, "token not found");

    const decoded = jwt.verify(token, String(dev.app.jwtActivationSecretKey));

    const existingUser = await User.findOne({email:decoded.email});

    if(existingUser) return res.status(409).send({
        success: false,
        error: 'This account is already activated',
    });

    const newUser = new User({ ...decoded });

    const user = await newUser.save();

    if (!user) throw createError(400, "user not created");

    return successHandler(res, 201, "User created, Please Sign In");
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    //get data from req body
    const { email, password } = req.body;

    if (!email || !password)
      throw createError(404, "eamil or password not found");

    if (password.length < 5)
      throw createError(400, "password must be 6 characters");

    const user = await User.findOne({ email: email });

    if (!user)
      throw createError(404, "user does not exist, Please register first");

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched)
      throw createError(400, "email or password does not match");

    if (user.isBanned)
      throw createError(400, "your id is banned, please contact admin");

    const token = jwt.sign(
      { id: user._id },
      String(dev.app.jwtAuthorisationSecretKey),
      {
        expiresIn: "15m",
      }
    );

    if (req.cookies[`${user._id}`]) {
      req.cookies[`${user._id}`] = "";
    }

    //send token inside the cookie
    res.cookie(String(user._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 14),
      httpmOnly: true,
      //secure: true,
      //sameSite: "none",
    });

    //token
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      image: user.image,
      isAdmin: user.is_Admin,
    };

    return successHandler(res, 200, "login successfull", {
      user: userData,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};


const getUserProfile = async (req, res, next) => {
  try {
    const  id  = req.params.id;
    
    const user = await User.findById(id);

    if (!user) throw createError(404, "user not found");

    return successHandler(res, 200, "user profile returned successfull!", {
      user: user,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(createError(400, "Invalid id"));
      return;
    }
    next(error);
  }
};

const logoutUser = async(req, res, next) => {
  console.log(logoutUser);
  try {
    if(!req.headers.cookie){
      return res.status(404). send({
        message: 'No cookie found',
      });
    }

    const token = req.headers.cookie.split('=')[1];

    if(!token){
      return res.status(404).send({
        message: 'No token found',
      })
    }

    const decoded = jwt.verify(token, String(dev.app.jwtAuthorisationSecretKey));
    if(!decoded) throw createError(403, 'Invalid token');

    if(req.cookies[`${decoded._id}`]){
      req.cookies[`${decoded._id}`] = '';
    }

    res.clearCookie(`${decoded._id}`);
    return successHandler(res, 200, 'user logged out')
  } catch (error) {
    next(error)
  }

};

const getRefreshToken = async(req, res, next) =>{
  try {
    if (!req.headers.cookie) {
      return res.status(404).send({
        message: "No cookie found",
      });
    }

    const oldToken = req.headers.cookie.split("=")[1];

    if (!oldToken) {
      return res.status(404).send({
        message: "No token found",
      });
    }

    const decoded = jwt.verify(
      oldToken,
      String(dev.app.jwtAuthorisationSecretKey)
    );
    if (!decoded) throw createError(403, "invalid token");

     const token = jwt.sign(
       { _id: decoded._id },
       String(dev.app.jwtAuthorisationSecretKey),
       { expiresIn: "8m" }
     );

    
     if (res.cookie[`${decoded._id}`]) {
       res.cookie[`${decoded._id}`] = "";
     }

      res.cookie(String(decoded._id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 2),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

         
     
      return successHandler(res, 200, 'refresh token', {token})
    
  } catch (error) {
    next(error)
    
  }

}

module.exports = {registerUser, verifyEmail, loginUser,getUserProfile, logoutUser, getRefreshToken};