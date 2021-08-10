const jwt = require("jsonwebtoken");

const signJwt = (user) => {
  const token = jwt.sign(
    { _id: user._id, name: user.name },
    process.env.SECRET,
    {
      expiresIn: 86400, // 24 hrs
    }
  );

  return token;
};

module.exports = {
  signJwt,
};
