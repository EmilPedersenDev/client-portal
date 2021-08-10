const axios = require("axios");
const db = require("../models/index");
const User = db.user;
const bankIdSettings = require("../services/bankIdSettings");
const { checkIfUserExists, createUser } = require("../controllers/user");
const { signJwt } = require("../services/jwt");

const timeOut = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const sleep = async (fn, orderRef) => {
  await timeOut(2000);
  return await fn(orderRef);
};

const signInUser = async (bankIdData) => {
  try {
    const user = await User.findOne({
      personalNumber: bankIdData.completionData.user.personalNumber,
    });

    let token;

    if (!user) {
      const newUser = await createUser(bankIdData);
      token = signJwt(newUser);
    } else {
      token = signJwt(user);
    }

    return token;
  } catch (err) {
    throw err;
  }
};

const callCollect = async (orderRef) => {
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
        httpsAgent: bankIdSettings,
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
      const token = await signInUser(data);
      return token;
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  callCollect,
  signInUser,
};
