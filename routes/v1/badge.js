const express = require("express");
const router = express.Router();

const service = require("../../services/v1/badge");
const { authenticateJWT } = require("../../utils/token");

router.get("/", authenticateJWT, HasRole("Admin"), service.getAll);

router.get("/:id", authenticateJWT, HasRole("Admin"), service.getById);

router.put("/", authenticateJWT, HasRole(["Admin", "Guest"]), service.add);

router.patch("/:id", authenticateJWT, HasRole("Admin"), service.update);

router.delete("/:id", authenticateJWT, HasRole("Admin"), service.delete);

function HasRole(role) {
  return function (req, res, next) {
    if (typeof role === "string") {
      //one role
      console.log(req.user.roles);
      if (!req.user.roles.includes(role)) res.sendStatus(403);
      else next();
    }

    if (typeof role === "object") {
      //more roles
      var ok = false;
      role.forEach((element) => {
        console.log(element);
        if (req.user.roles.includes(element)) ok = true;
      });
      if (ok) {
        next();
      } else {
        res.sendStatus(403);
      }
    }
  };
}

module.exports = router;
