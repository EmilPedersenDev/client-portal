const db = require("../models/index");
const User = db.user;

const checkIfUserExists = async (personalNumber) => {
  const isUserExisting = await User.findOne({ personalNumber: personalNumber });
  return !!isUserExisting;
};

const createUser = async (bankIdData) => {
  try {
    const user = new User({
      name: bankIdData.completionData.user.name,
      personalNumber: bankIdData.completionData.user.personalNumber,
      email: "",
      companies: [],
    });

    const userData = await user.save();

    return userData;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  checkIfUserExists,
};
