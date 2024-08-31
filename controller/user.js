const User = require("../models/user");

async function handlegetsignin(req,res) {
    return res.render("signin");
}


async function handlegetsignup(req,res) {
    return res.render("signup");
}

async function handlepostsignin(req,res) {
    const { email , password } = req.body;
    const user = User.matchPassword(email,password);

    console.log("USER :", user);
    return res.redirect("/");
}

async function handlepostsignup(req,res) {
    const { name,email,password } = req.body;
    const newuser = await User.create({
        name,
        email,
        password
    });
    return res.redirect("/")
}


module.exports = {
    handlegetsignin,
    handlegetsignup,
    handlepostsignin,
    handlepostsignup,
}