const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const Token = require("../../utils/token");

exports.getAll = async (req, res, next) => {
  try {
    let userList = await User.find();

    if (userList) {
      return res.status(200).json(userList);
    }
    return res.status(404).json("user_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

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

  /*
  try {
    let userList = await User.find();

    if (userList) {
      return res.status(200).json(userList);
    }
    return res.status(404).json("user_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }

  */
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  console.log("getUserById : " + id);
  try {
    let user = await User.findById(id);

    if (user) {
      return res.status(200).json(user);
    }

    return res.status(404).json("user_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.add = async (req, res, next) => {
  const temp = {};

  ({
    name: temp.name,
    firstname: temp.firstname,
    pseudo: temp.pseudo,
    email: temp.email,
    password: temp.password,
    roles: temp.roles,
  } = req.body);

  Object.keys(temp).forEach((key) => temp[key] == null && delete temp[key]);

  try {
    let user = await User.create(temp);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const temp = {};

  ({
    name: temp.name,
    firstname: temp.firstname,
    pseudo: temp.pseudo,
    email: temp.email,
    password: temp.password,
    roles: temp.roles,
  } = req.body);

  console.log("+++++temp 1+++++++++++");
  console.log(temp);

  try {
    let user = await User.findById(id);
    console.log(user)

    if (user) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          console.log("######");
          console.log(`key : ${key} user key : ${user[key]} tempkey : ${temp[key]}`)
          user[key] = temp[key];
        }
      });
      console.log("++++++++++++++++");
      console.log(req.body);
      console.log("++++++++++++++++");
      console.log(temp);
      console.log("++++++++++++++++");
      console.log(user);
      
      await user.save();
      return res.status(201).json(user);
    }

    return res.status(404).json("user_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    await User.deleteOne({ _id: id });

    return res.status(204).json("delete_ok");
  } catch (error) {
    return res.status(501).json(error);
  }
};
