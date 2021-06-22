const express=require("express")
require("./mongooseConnection")
const port = 3000;
const userRoutes= require("./routes/userRoutes")
const recordRoutes= require("./routes/recordRoutes")
const orderRoutes= require("./routes/orderRoutes")
const createError = require("http-errors")
const {cors, printTime, clgValue} = require('./middlewares/CustomMiddlewares')
const {auth} = require('./middlewares/Auth')
//create express server
const app = express()
app.use(cors)
//express middleware
//parsing req.body
app.use(express.json())

//external middleware
/* app.use(logger("combined")) */

app.use(printTime)
app.use(clgValue)

//Endpoints / routes
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html")
})

app.use("/users", userRoutes)
app.use("/records", auth, recordRoutes )
app.use("/orders",auth,orderRoutes )


// 404 page not found middleware
app.use((req,res,next)=>{
   /*  let err = new Error("page not found") */
   /*  err.status=404; */
    /*  let err = new createError.NotFound() */
    let err = createError(404,"page not found")
    next(err)
})

//error handling middleware/ universal error handler
app.use((err,req,res,next)=>{
    res.status(err.status || 500).send({success:false, message:err.message})
})



app.listen(port, ()=>console.log("express server is running on port: ",port))