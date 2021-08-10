const axios = require("axios");
const bankIdSettings = require("../services/bankIdSettings");

const authService = require("../services/auth");

module.exports = (app) => {
  app.post("/auth", async (req, res) => {
    try {
      const bankIdReqBody = {
        personalNumber: req.body.ssn,
        endUserIp: req.body.ip,
      };

      const { data } = await axios.post(
        "https://appapi2.test.bankid.com/rp/v5/auth",
        bankIdReqBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
          httpsAgent: bankIdSettings,
        }
      );
      let orderRef;
      if (data.orderRef) {
        orderRef = data.orderRef;
      }

      res.json(orderRef);
    } catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  });

  app.post("/collect", async (req, res) => {
    try {
      const token = await authService.callCollect(req.body.orderRef);

      return res
        .cookie("access_token", token, {
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
          message: "Logged in successfully",
        });
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

  app.get("/logout", (req, res) => {
    return res.clearCookie("access_token").status(200).json({
      message: "Logged out",
    });
  });
};
