//import db from database
const UsersModel = require("../models/UserSchema");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
//bcrypt.hash
const jwt = require('jsonwebtoken')
//jwt.sign(payload, secret key as a string) - creates token
//jwt.verify(token, secretKey) - verifies token
exports.getUsers = async (req, res, next) => {
  try {
    // //check if the user is authenticated
    // const token = req.header('x-auth')
    // const decodedToken = jwt.verify(token, 'secretkeyfromnaqvi')
    // if (!decodedToken) {
    //   throw new Error('jason web token must be provided')
    // }
      //get all users from users collection
    let users = await UsersModel.find({});
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

exports.getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    //get a single user from users collection
    const user = await UsersModel.findById(id).select('firstname lastname email');
    user.fullname="Magda Sokolovic"
    await user.save()
    console.log(user)

    if (user) {
      return res.json({ success: true, data: user});
    } else {
      next(new createError.BadRequest("no such user found in our collection"));
    }
  } catch (err) {
    next(err);
  }
};

exports.postUser = async (req, res, next) => {
    //add new user into our users collection
    try{
      //hash the password and stored hashed password to database:
      // let salt = bcrypt.genSaltSync(10)
      // console.log(salt)
      // let hashedPassword = bcrypt.hashSync(req.body.password, salt)
      const user = new UsersModel(req.body)
      await user.save()
      res.send({success:true, data:user})
    }
    catch(err){
        console.log(err.message)
        next(err)
    }
} 


exports.patchUser = async (req, res, next) => {

    try{
        const {id} =req.params
        //update user in our users collection
        const user = await UsersModel.findByIdAndUpdate(id, req.body, {new:true})
        res.send({success:true, data:user})

    }
    catch(err){
        next(err)
    }
};

exports.deleteUser = async (req, res, next) => {
    try{
        const {id}= req.params
        const user = await UsersModel.findByIdAndDelete(id)
        res.send({success:true, data:user})
    }
    catch(err){
        next(err)
    }
};

exports.loginUser = async (req, res, next) => {
  try {
      const user = await UsersModel.findOne({email: req.body.email})
    if (!user) {
      next(new createError.NotFound('No such user found in DB'))
    } else {
      //comparing password with hash password
      const check = bcrypt.compareSync(req.body.password, user.password)

      if (!check) {
        next(new createError.NotFound('password does not match'))
      } else {
        const token = jwt.sign({id: user._id, email: user.email}, 'secretkey')
        res.header('x-auth', token)
        res.send({success: true, message: "authenticated"})
      }
    }
  } catch(err){
    next(err)
  }
   
}
