const jwt = require("jsonwebtoken");

exports.getId = (token) => {
  console.log(token);
  if (!token) return undefined;
  token = token.replace("Bearer", "").trim(); // const token = token.split(' ')[1];
  console.log(token);
  return jwt.verify(token, process.env.TOKEN_KEY, function (err, user) {
    if (err) {
      console.log(err);
      return undefined;
    }
    console.log("id " + user.id);

    return user.id.trim();
  });
};

exports.authenticateJWT = (req, res, next) => {
  
  const authHeader = req.headers.authorization;

  console.log("use : authenticateJWT");

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;

      next();
    });
  } else {
    res.sendStatus(401);
  };
 
 
};
