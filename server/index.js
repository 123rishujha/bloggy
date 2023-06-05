const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
// const { errorHandler } = require("./middlewares/errorHandler");

//connection with mongodb database;
const { connection } = require("./config/db");
//routes
const { userRouter } = require("./routes/userRoutes");
const { chatRouter } = require("./routes/chatRoutes");
const { messageRoutes } = require("./routes/messageRoutes");
const { authMiddleware } = require("./middlewares/authMiddleware");

const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
// app.use((req, res, next) => {
//   console.log(process.env.FRONT_END_URL);
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Origin", process.env.FRONT_END_URL);
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, DELETE"
//   );
//   next();
// });
app.use(cookieParser());
app.use(express.json());

app.get("/", authMiddleware, (req, res) => {
  console.log(req.user);
  res.json({ message: "working" });
});

//routes
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRoutes);

//for handling invalid routes -> 404 Not Found
app.all("*", (req, res, next) => {
  let error = { message: `404 Not Found: ${req.url}`, statusCode: 404 };
  next(error);
});

// app.use(errorHandler);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "something went wrong";
  res.status(statusCode).json({
    status: statusCode,
    message,
  });
});

app.listen(8080, async () => {
  console.log("server is running...");
  try {
    await connection;
    console.log("connected to database");
  } catch (err) {
    console.log(err);
    console.log("Not connected to database");
  }
});
