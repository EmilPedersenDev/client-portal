require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./services/connectDb");

app.use(express.json());
app.use(cors());

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
