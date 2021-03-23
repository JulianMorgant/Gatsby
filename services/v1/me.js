const User = require("../../models/User");
const Token = require("../../utils/token");

exports.getByToken = async (req, res, next) => {
  console.log("getByToken : " + req.headers.authorization);

  const id = Token.getId(req.headers.authorization);
  console.log("getUserById : " + id);
  try {
    let user = await User.findById(id);

    if (user) {
      return res.status(200).json({ user: user });
    }

    return res.status(404).json("user_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
}
