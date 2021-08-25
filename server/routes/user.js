const db = require("../models/index");
const User = db.user;

module.exports = (app) => {
  app.get("/user/:_id", async (req, res) => {
    try {
      const { _id } = req.params;

      if (!_id) {
        return res.status(404).json({
          message: "Could not find id",
        });
      }

      const user = await User.findOne({ _id: _id });

      if (!user) {
        return res.status(404).json({
          message: "Could not find user",
        });
      }
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  });

  app.post("/user/company", async (req, res) => {
    const { company, client, ssn, email } = req.body;

    if (!company || !client || !email || !ssn) {
      res.status(404).json({
        message: "Could not find entity.",
      });
    }

    try {
      const user = await User.findOne({ personalNumber: ssn });

      if (!user) {
        // create a new user!
        const newUser = new User({
          name: client,
          personalNumber: ssn,
          email: email,
          role: "User",
          companies: [],
        });

        newUser.companies.push(company);

        await newUser.save();
      } else {
        user.email = email;
        user.companies.push(company);
        await user.save();
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err.message);
    }

    res.sendStatus(200);
  });
};
