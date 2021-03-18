const jwt = require("jsonwebtoken");

exports.getId = (token) => {
  console.log(token);
  if (!token) return undefined;
  token = token.replace("Bearer", "").trim();
  console.log(token);
  return jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
    if (err) {
      console.log(err);
      return undefined;
    }
    console.log("id " + decoded.id);

    return decoded.id.trim();
  });
};
