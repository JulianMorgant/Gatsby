const dotenv = require("dotenv");

// get config vars
dotenv.config();

// access config var
// process.env.TOKEN_KEY;

const tokens = process.env.TOKEN_KEY;
module.exports = tokens;
