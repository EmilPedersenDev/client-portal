const https = require("https");

const bankIdSettings = new https.Agent({
  pfx: require("fs").readFileSync("./FPTestcert3_20200618.p12"),
  passphrase: "qwerty123",
  ca: require("fs").readFileSync("./BankID.cer"),
});

module.exports = bankIdSettings;
