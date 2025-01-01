"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const Token = require("../models/token");
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {

  const auth = req.headers?.authorization || null; // Token ...Tokenkey... || Bearer ...AccessToken...
  const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...TokenKey...] || ['Bearer', '...AccessToken...]

  if (tokenKey) {

    if (tokenKey[0] == "Token") {
      // SIMPLE TOKEN:
      const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
        "userId"
      );
      
      if (tokenData) req.user = tokenData.userId;

    } else if (tokenKey[0] == 'Bearer') {
      // JWT:

      // JWT Decode & Verify:
      jwt.verify(tokenKey[1], process.env.ACCESS_KEY, function(error, accessData) {
        
        // console.log(accessData)
        if (accessData) req.user = accessData

      })

    }
  }



 
  next();

};
