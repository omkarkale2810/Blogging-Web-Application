const { use } = require("bcrypt/promises");
const jwt = require("jsonwebtoken");

const secret = "@!omkar!kale9325";

function create_token_for_user(user){
    const payload = {
        _id: user._id,
        email:user.email,
        profilephotourl:user.profilephotourl,
        role:user.role,
    };

    const token = jwt.sign(payload,secret);
    return token;
}

function validate_user_token(token){
    const payload = jwt.verify(token , secret);
    return payload;
}

module.exports = {
    create_token_for_user,
    validate_user_token,
}
