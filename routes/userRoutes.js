const express = require("express");
const {auth} = require("../middlewares/Auth")
const Route = express.Router();

const {
  getUsers,
  getSingleUser,
  postUser,
  patchUser,
  deleteUser,
  loginUser
} = require("../controllers/userControllers");

const validateSanitize = require('../middlewares/validation-sanitization')
//import data from modals
/* const users = require("../modals/data") */

//CRUD operation
//create
//read
//updated
//delete

//creating routes
//get request for all users

Route.get("/", auth, getUsers);
//route to get a single user
Route.get("/:id", auth, getSingleUser);
//get post request (create a new user)

// "check" and "body" are the same
Route.post("/",validateSanitize, auth, postUser);
Route.post('/login', loginUser)
//"exists method is a validaiton, trim is sanitanization"
//get patch request (update)
Route.patch("/:id", auth, patchUser);
//get delete request (delete)
Route.delete("/:id", auth, deleteUser);

/* Route.route("/")
.get(getUsers)
.post(postUser);

Route.route("/:id")
.get(getSingleUser)
.patch(patchUser)
.delete(deleteUser); */

module.exports = Route;
