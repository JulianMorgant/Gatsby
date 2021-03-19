const express = require("express");
const router = express.Router();

const service = require("../../services/v1/user");
const { authenticateJWT } = require("../../utils/token");

router.get("/getAll", authenticateJWT, HasRole("Admin"), service.getAll);

router.get("/:id", authenticateJWT, HasRole("Admin"), service.getById);

router.get("/", authenticateJWT, service.getByToken);

router.put("/add", authenticateJWT, HasRole("Admin"), service.add);

router.patch("/update", authenticateJWT, HasRole("Admin"), service.update);

router.delete("/:id", authenticateJWT, HasRole("Admin"), service.delete);

function HasRole(role) {
  return function (req, res, next) {
    console.log(req.user.roles);
    if (!req.user.roles.includes(role)) res.sendStatus(403);
    else next();
  };
}

module.exports = router;
