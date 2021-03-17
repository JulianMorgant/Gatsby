const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  console.log(" login service ");

  const email = req.body.email;                 //TODO à passer dans autorization ?
  const password = req.body.password;

  User.findOne({ email }).then((user) => { // TODO Refactor try catch ?
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    // Compare psw hash

    bcrypt.compare(password, user.password).then((isMatch) => {  
      if (isMatch) {
        //create JWT payload
        const payload = {
          id: user.id,
          pseudo: user.pseudo,
          roles: user.roles,
          email: user.email,
        };

        // create signed JWT
        jwt.sign(
          payload,
          process.env.TOKEN_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({password: "Wrong Password"});   // TODO ~?
      }
    });
  });
};
