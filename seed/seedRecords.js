// mongoose => npm i mongoose -S
// faker => npm i faker -D
const mongoose = require("mongoose");
const Record = require("../models/RecordSchema");
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
    
    await Record.deleteMany({});
    const records = Array(10)
      .fill(null)
      .map(() => {
        const record = new Record({
          title: faker.commerce.productName(), 
          artist:faker.name.lastName() ,
          year: faker.date.past(), 
          img: faker.image.imageUrl(),
          price: faker.commerce.price()

        });
        return record.save();
      });
    console.log(records);
    await Promise.all(records);
  } catch (err) {
    console.log(err.message);
  }
  mongoose.connection.close();
}

seedData();
