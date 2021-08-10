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

      const { user } = await User.findOne({ _id: _id });

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
};
