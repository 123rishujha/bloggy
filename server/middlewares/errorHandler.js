
const errorHandler = (err,req,res,next)=>{
    // console.log("errorHandler called",err.statusCode);
    const statusCode = err.statusCode || 500; //
    const message = err.message || "something went wrong";
    res.status(statusCode).json({
        status: statusCode,
        message
    })
}

module.exports = {
    errorHandler
}