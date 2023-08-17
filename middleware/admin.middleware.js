require('dotenv').config()
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/admin.module')


const verifyToken = asyncHandler(async (req, res, next)=> {
   let token;
   if(req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer')){
      try {
         token = req.headers['authorization'].split(' ')[1]
         const decoded = jwt.verify(token, process.env.JWT_SECRET)

         req.user = await Admin.findById(decoded.userId).select('-password')
         next()
      }
      catch(error){
         res.status(401).json({ message: 'Invalid authorization token' });
      }
   }
   if(!token) {
      res.status(401).json({ message: 'User not authorized' });
   }
})

module.exports = {verifyToken}