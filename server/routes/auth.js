const https = require("https");
const axios = require("axios");

const authService = require("../services/auth");

const certSettings = new https.Agent({
  pfx: require("fs").readFileSync("./FPTestcert3_20200618.p12"),
  passphrase: "qwerty123",
  ca: require("fs").readFileSync("./BankID.cer"),
});

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
          httpsAgent: certSettings,
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
      const data = await authService.callCollect(
        req.body.orderRef,
        certSettings
      );
      res.json(data);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });
};
