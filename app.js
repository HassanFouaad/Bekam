require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/auth");
const app = express();
//Database Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"));
//MiddleWares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

//App

//Routes
app.use("/api", userRouter);

const port = process.env.PORT || 8000;
app.listen(port, (err, response) => {
  console.log(`Server is Running on Port : ${port}`);
});
