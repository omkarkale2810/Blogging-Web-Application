const express = require("express");
const {handlegetsignin, handlegetsignup , handlepostsignin , handlepostsignup} = require("../controller/user")

const router = express.Router();

router.route("/signin").get(handlegetsignin).post(handlepostsignin);

router.route("/signup").get(handlegetsignup).post(handlepostsignup);

module.exports = router;