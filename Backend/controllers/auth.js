const User = require('../models/user')
const {body } = require('express-validator')

exports.signup = (req,res,next)=>{
   const {email,name,password} = req.body
}