const express = require("express");

const Route = express.Router();
const {
  getOrders,
  getSingleOrder,
  postOrder,
  patchOrder,
  deleteOrder,
} = require("../controllers/orderControllers");
//import data from modals
/* const Orders = require("../modals/data") */

//CRUD operation
//create
//read
//updated
//delete

//creating routes
//get request for all Orders

Route.get("/", getOrders);
//route to get a single Order
Route.get("/:id", getSingleOrder);
//get post request (create a new Order)
Route.post("/", postOrder);
//get patch request (update)
Route.patch("/:id", patchOrder);
//get delete request (delete)
Route.delete("/:id", deleteOrder);

/* Route.route("/")
.get(getOrders)
.post(postOrder);

Route.route("/:id")
.get(getSingleOrder)
.patch(patchOrder)
.delete(deleteOrder); */

module.exports = Route;
