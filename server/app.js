//import express module
const express = require("express");
const authRouter = require("./routes/auth");
const urlRouter = require("./routes/url");
const cors = require("cors");

//To access data from .env file
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
dotenv.config();

//create express app
const app = express();
app.use(express.json());

//Define port
const port = process.env.Port || 8080;

// Check environment
const isProduction = process.env.NODE_ENV === "production";

// CORS Configuration
const corsOptions = {
  origin: isProduction ? process.env.CLIENT_PROD_URL : "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
};

// This will allow the user in the frontend to consume the APIs that you have created without any problem.
app.use(cors(corsOptions));

// Disable X-Powered-By Header
app.disable("x-powered-by");

app.set("trust proxy", true);

//get request when server is live
app.get("/", (req, res) => {
  res.status(200).json({
    message : "Server id Live"
  });
});

app.use(urlRouter);  // create or redirect url
app.use(authRouter); // for sign up and login feature 
app.use(userRouter); // API endpoint to get all url's shortened by user

//create a server
app.listen(port, (req, res) => {
  console.log("server listening at port " + port);
});

