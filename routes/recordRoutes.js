const express = require("express");

const Route = express.Router();
const {
  getRecords,
  getSingleRecord,
  postRecord,
  patchRecord,
  deleteRecord,
} = require("../controllers/recordControllers");
//import data from modals
/* const Records = require("../modals/data") */

//CRUD operation
//create
//read
//updated
//delete

//creating routes
//get request for all Records

Route.get("/", getRecords);
//route to get a single Record
Route.get("/:id", getSingleRecord);
//get post request (create a new Record)
Route.post("/", postRecord);
//get patch request (update)
Route.patch("/:id", patchRecord);
//get delete request (delete)
Route.delete("/:id", deleteRecord);

/* Route.route("/")
.get(getRecords)
.post(postRecord);

Route.route("/:id")
.get(getSingleRecord)
.patch(patchRecord)
.delete(deleteRecord); */

module.exports = Route;
