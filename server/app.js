//console.log("Working1");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Import routers
const authRouter = require("./routes/auth");
const urlRouter = require("./routes/url");
const userRouter = require("./routes/user");

dotenv.config();  // Load environment variables

const app = express();

//console.log("Working2");

//app.use((req, res, next) => {
 // console.log("Working3");
 // console.log(res.getHeaders());
  //next();
//})

// rate limitter using express library
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

// Disable X-Powered-By Header
app.disable("x-powered-by");

// Configure CORS to allow requests from any origin
const corsOptions = {
  origin: "*",  // Allow requests from any origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false  // Credentials won't be allowed with '*'
};
app.use(cors(corsOptions));

// Handle preflight requests (OPTIONS) for all routes
app.options('*', cors(corsOptions));  // This handles CORS preflight checks for all routes

// Use helmet to set security headers
app.use(helmet({
  contentSecurityPolicy: false,  // Disable CSP for now (adjust based on your needs)
  frameguard: {
    action: 'deny'  // Prevent clickjacking by denying all iframe usage
  }
}));

//console.log("Working4");

app.use((req, res, next) => {
  res.removeHeader('X-Frame-Options');  // Remove X-Frame-Options
  res.setHeader('X-Frame-Options', 'ALLOWALL');  // Allow all frames
  res.removeHeader('Content-Security-Policy');  // Remove CSP

  // Log the headers before sending the response
  console.log("Response Headers:", res.getHeaders());

  next();
});


// Body parser middleware to handle JSON
app.use(express.json());

// Define port from environment variable or default to 8080
const port = process.env.PORT || 8080;

// Basic health check route
app.get("/", async (req, res) => {
  return res.status(200).json({
    message: "Piyush bhai Bhabi kaha hai?"
  });
});


// Use routers for specific API routes
app.use(authRouter);  // Authentication routes (sign up, login, etc.)
app.use(urlRouter);   // URL creation or redirection routes
app.use(userRouter);  // User-specific routes (e.g., fetching all URLs for a user)

// Start server
app.listen(port, () => {
  console.log("Server is listening at port " + port);
});
