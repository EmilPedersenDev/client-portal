require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./services/connectDb");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

connectDb();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome!",
  });
});

require("./routes/auth")(app);

app.listen(3000, () => {
  console.log("Listen att 3000");
});
