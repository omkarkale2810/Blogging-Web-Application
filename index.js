const express = require("express");
const path = require("path");
const {connectmongodb} = require("./connect");
const userrouter = require("./routes/user");

const app = express();
const PORT = 8000; 

connectmongodb("mongodb://localhost:27017/blogg").then((er)=>{console.log("Mongodb connected")});

app.set("view engine" , "ejs");
app.set("views",path.resolve("./views"));

app.use( express.json() );
app.use( express.urlencoded( { extended:false } ) );



app.get("/" , (req,res)=>{
    res.render("home");
})

app.use("/user" , userrouter );

app.listen(PORT , ()=>{console.log(`Server Started at PORT :${PORT}`)});