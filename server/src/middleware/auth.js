const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const dev = require('../config');
const User = require('../models/userModel');

const isLoggedIn = (req, res, next) => {
    try {
        //cookie here
        if(!req.headers.cookie){
            return res.status(400).send({
                message:'no cookie found'
            })
        }

        const token = req.headers.cookie.split('=')[1];
        

        //verify token
        if(!token){
            return res.status(404).send({
                message:"no token found"
            })
        }

        const decoded = jwt.verify(
          token,
          String(dev.app.jwtAuthorisationSecretKey)
        );
        
        
        if(!decoded)throw createError(403, 'Invalid token');
        req._id = decoded._id;
               
        next();
    } catch (error) {

        next(error);
    };
};

const isLoggedOut = (req, res, next)=> {
    try {
        if(req.headers.cookie){
            throw createError(
                401, 'Not possible to process the request, please login'
            )
        }
        next();
    } catch (error) {
        next(error)
        
    }
};

const isAdmin  = async(req, res, next) => {
    try {
        const id = req._id;
        if(id) {
            const user = await User.findById(id);
            if(!user) throw createError(404, "no user found")
            if(!user.isAdmin)throw createError(401, 'User is not an Admin');
            next();
        } else {
            throw createError(404, 'Please login')
        }
    } catch (error) {
        next(error)
    }
};

module.exports = {isLoggedIn, isLoggedOut, isAdmin}