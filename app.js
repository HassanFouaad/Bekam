require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const orderRouter = require("./routes/order");
const app = express();
const path = require("path");

//Database Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"));
//MiddleWares
app.disable("etag");
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//App
const path = require("path");
//Routes
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", orderRouter);

/////SERV STATIC
if (process.env.NODE_ENV === "production") {
  ///set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 5000);
