const mongoose = require("mongoose");
const {createHmac , randomBytes} = require("crypto");
const { error } = require("console");
const { create_token_for_user } = require("../services/authentication");

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    Profilephotourl:{
        type:String,
        default:"/images/default-profile"
    },
    role:{
        type:String,
        enum:[ "USER" , "ADMIN" ],
        default:"USER",
    },
},
    {timestamps:true}
)
// mhanje user database madhe store karnya purvi tyacha password ani salt value store karun thevne 
userschema.pre("save" , function (next){
    const user = this;
    
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashed_pass = createHmac("sha256" , salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashed_pass;
    next();
})

userschema.static("matchPasswordAndGenerateToken" , async function matchPasswordAndGenerateToken(email,password){
    const user = await this.findOne({email});
    if(!user) throw new error("user not found");

    const salt = user.salt;
    const hashed_pass = user.password;

    const userprovidedhash = createHmac("sha256" , salt).update(password).digest("hex");

    if(userprovidedhash !== hashed_pass){
        throw new error("Password Not Matched");
    }
    // when user logged in successfully then we generate the token and then return 
    const token = create_token_for_user(user);
    return token;

})

const User = mongoose.model("user" , userschema);

module.exports = User;
