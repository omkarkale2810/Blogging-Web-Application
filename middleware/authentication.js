const {validate_user_token} = require("../services/authentication");

function check_for_authentication_cookie(cookiename) {
    return (req,res,next)=>{
        const tokencookievalue = req.cookies[cookiename];
        if (!tokencookievalue) {
            return next();
        }
        try{
            const userpayload = validate_user_token(tokencookievalue);
            req.user = userpayload;
        }
        catch(error){}
        
        return next();
    }
    
}


module.exports = {
    check_for_authentication_cookie,

}