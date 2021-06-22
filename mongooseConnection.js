const mongoose = require("mongoose")
const dotenv= require("dotenv")
dotenv.config()

//create mongoose connection
mongoose.connect(process.env.URI, { dbName: process.env.DB,useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true})

//listening for mongoose connection
mongoose.connection.on("open",()=>console.log("db connected"))

//listening for any error 
mongoose.connection.on("error",(err)=>console.log(err.message))

//listener for disconnection
mongoose.connection.on("disconnected",()=>console.log("db connection disconnected"))

//ctrl C
process.on("SIGINT",()=>{
    mongoose.connection.close()
    process.exit()
})