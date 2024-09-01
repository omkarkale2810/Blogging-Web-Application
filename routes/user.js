const express = require("express");
const {handlegetsignin, handlegetsignup , handlepostsignin , handlepostsignup ,handlelogout} = require("../controller/user")

const router = express.Router();

router.route("/signin").get(handlegetsignin).post(handlepostsignin);

router.route("/signup").get(handlegetsignup).post(handlepostsignup);

router.get("/logout" , handlelogout );

module.exports = router;