const express = require("express");
const path = require("path");
const {connectmongodb} = require("./connect");
const userrouter = require("./routes/user");
const blogrouter = require("./routes/blog");
const cookieparser = require("cookie-parser");

const Blog = require("./models/blogs");

const { check_for_authentication_cookie } = require("./middleware/authentication");

const app = express();
const PORT = 8000; 

connectmongodb("mongodb://localhost:27017/blogg").then((er)=>{console.log("Mongodb connected")});

app.set("view engine" , "ejs");
app.set("views",path.resolve("./views"));

app.use( express.json() );
app.use( express.urlencoded( { extended:false } ) );
app.use( cookieparser());
app.use( check_for_authentication_cookie("token") );
app.use( express.static(path.resolve("./public")) )


app.get("/" ,async (req,res)=>{
    const allblogs = await Blog.find({});
    res.render("home" , { 
        user:req.user,
        blogs:allblogs,
    } );
})

app.use("/user" , userrouter );
app.use("/blog" , blogrouter );

app.listen(PORT , ()=>{console.log(`Server Started at PORT :${PORT}`)});