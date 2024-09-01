const User = require("../models/user");

async function handlegetsignin(req,res) {
    return res.render("signin");
}


async function handlegetsignup(req,res) {
    return res.render("signup");
}

async function handlepostsignin(req,res) {
    const { email , password } = req.body;
    try{
        const token = await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token" , token).redirect("/");
    }
    catch(error){
        return res.render("signin" , {error:"Incorrect Email or Password"});

    }
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

function handlelogout(req,res){
    res.clearCookie("token").redirect("/");
    
}

module.exports = {
    handlegetsignin,
    handlegetsignup,
    handlepostsignin,
    handlepostsignup,
    handlelogout,
}