const Badge = require("../../models/Badge");

exports.getAll = async (req, res, next) => {
  try {
    let badgeList = await Badge.find();

    if (badgeList) {
      return res.status(200).json(badgeList);
    }
    return res.status(404).json("badge_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  console.log("getBadgeById : " + id);
  try {
    let badge = await Badge.findById(id);

    if (badge) {
      return res.status(200).json(badge);
    }

    return res.status(404).json("badge_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.add = async (req, res, next) => {
  const temp = {};

  ({
    title: temp.title,
    text: temp.text,
    image: temp.image,
    link: temp.link,
    stars_1: temp.stars_1,
    stars_2: temp.stars_2,
  } = req.body);

  console.log(`=> create Badge : ${temp}`);

  Object.keys(temp).forEach((key) => temp[key] == null && delete temp[key]);

  try {
    let badge = await Badge.create(temp);

    return res.status(201).json(badge);
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
    let badge = await Badge.findById(id);
    console.log(badge);

    if (badge) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
   
          badge[key] = temp[key];
        }
      });


      await badge.save();
      return res.status(201).json(badge);
    }

    return res.status(404).json("badge_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Badge.deleteOne({ _id: id });

    return res.status(204).json("delete_ok");
  } catch (error) {
    return res.status(501).json(error);
  }
};



