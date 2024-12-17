"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /
//!
/*------------------------------------------- */
// auth:
router.use("/auth", require("./auth"));
// user:
router.use("/user", require("./user"));
// token:
router.use("/token", require("./token"));

// order:
router.use("/order", require("./order"));
// pizza:
router.use("/pizza", require("./pizza"));
// topping:
router.use("/topping", require("./topping"));

// document:
router.use("/document", require("./document"));

/* ------------------------------------------------------- */
module.exports = router;
