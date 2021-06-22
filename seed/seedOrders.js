// mongoose => npm i mongoose -S
// faker => npm i faker -D
const mongoose = require("mongoose");
const Order = require("../models/OrderSchema");
const faker = require("faker");

/* MONGODB Connection */
/* mongoose.connect("mongodb://127.0.0.1:27017", {dbName:"dummydatabase" }) */


mongoose.connect(
  "mongodb://127.0.0.1:27017/record-shop-fbw44",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("connected to DB");
  }
);

/* let db = mongoose.createConnection( "mongodb://127.0.0.1:27017/record-shop-fbw44",
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },()=>{
    console.log("db connection established")
}) */
/* db.collection("users").insertOne({firstname:"abc"}) */

//seed data into database

async function seedData() {
  try {
    //Purge/Delete all users inside the user collection
    
    await Order.deleteMany({});
    const orders = Array(10)
      .fill(null)
      .map(() => {
        const order = new Order({
            
            quantity:faker.datatype.number(),
            record:faker.datatype.uuid()

        });
        return order.save();
      });
    console.log(orders);
    await Promise.all(orders);
  } catch (err) {
    console.log(err.message);
  }
  mongoose.connection.close();
}

seedData();
