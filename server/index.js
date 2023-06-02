const express = require("express");
require("dotenv").config();
// const { errorHandler } = require("./middlewares/errorHandler");

//connection with mongodb database;
const { connection } = require("./config/db");
//routes
const { userRouter } = require("./routes/userRoutes");
const { chatRouter } = require("./routes/chatRoutes");
const { messageRoutes } = require("./routes/messageRoutes");


const app = express();


app.use(express.json());
//routes
app.use("/api/auth",userRouter);
app.use("/api/chat",chatRouter);
app.use("/api/message",messageRoutes);


//for handling invalid routes -> 404 Not Found
app.all("*",(req,res,next)=>{
    let error = {message:`404 Not Found: ${req.url}`,statusCode:404};
    next(error);
});

// app.use(errorHandler);
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500; 
    const message = err.message || "something went wrong";
    res.status(statusCode).json({
        status: statusCode,
        message
    })
});


app.listen(8080,async()=>{
    console.log("server is running...");
    try{
        await connection;
        console.log("connected to database");
    }
    catch(err){
        console.log(err);
        console.log("Not connected to database");
    }
});
