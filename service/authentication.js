const JWT = require("jsonwebtoken");
const secret = "secret";
function generateToken(user) {
  const token = JWT.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
  return token;
}

function verifyToken(token) {
  const match = JWT.verify(token, secret);
  console.log(match);
  return match;
}

module.exports = { generateToken, verifyToken };
