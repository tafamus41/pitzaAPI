"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller:

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
} = require("../errors/customError");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "aA?123456",
                }
            }
        */

    const { username, password, email } = req.body;

    if (!((username || email) && password))
      throw new BadRequestError("username/email and password are required");

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) throw new NotFoundError("username/email is not found");

    if (!user.isActive) throw new UnauthorizedError("This user is inactive");

    if (user.password !== passwordEncrypt(password))
      throw new UnauthorizedError("incorrect password");

    let tokenData = await Token.findOne({ userId: user._id });

    if (!tokenData) {
      const tokenKey = passwordEncrypt(user._id + Date.now());
      tokenData = await Token.create({ userId: user._id, token: tokenKey });
    }

    res.status(200).send({
      error: false,
      token: tokenData.token,
      user,
    });
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "simpleToken: Logout"
            #swagger.description = 'Delete token key.'
        */

    // Token token'ın kendisi
    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;
    let deleted = null;
    // if (tokenKey && tokenKey[0] == "Token") {
    if (tokenKey?.at(0) == "Token") {
      deleted = await Token.deleteOne({ token: tokenKey[1] });
      // return res.status(200).send({
      //   message: "logout: token deleted",
      //   deleted, //!silinen gösterilsin
      // });
    }
    res.send({
      error: false,
      message: "Token deleted. Logout was OK.",
    });
  },
};
