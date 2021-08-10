const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome!",
  });
});

require("./routes/auth")(app);

app.listen(3000, () => {
  console.log("Listen att 3000");
});
