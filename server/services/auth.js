const axios = require("axios");

const timeOut = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const sleep = async (fn, orderRef) => {
  await timeOut(2000);
  return await fn(orderRef);
};

const callCollect = async (orderRef, certSettings) => {
  try {
    const bankIdReqBody = {
      orderRef: orderRef,
    };

    const { data } = await axios.post(
      "https://appapi2.test.bankid.com/rp/v5/collect",
      bankIdReqBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
        httpsAgent: certSettings,
      }
    );

    if (data.hintCode) {
      // TODO: must abort if status indicates failed
      // call again for non failed statuses
      if (
        data.hintCode != "expiredTransaction" && // msg RFA8
        data.hintCode != "certificateErr" && // msg RFA16
        data.hintCode != "userCancel" && // msg RFA6
        data.hintCode != "cancelled" && // msg RFA3
        data.hintCode != "startFailed"
      ) {
        return await sleep(callCollect, orderRef);
      } else {
        // fail, return
        throw new Error(data.hintCode);
      }
    } else {
      return data;
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  callCollect,
};
