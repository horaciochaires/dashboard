const getTokenFromHeader = require("./getTokenFromHeader");
const { validationAccesToken } = require("./validateToken");

function authenticate(req,res,next) {
    const token = getTokenFromHeader(req.headers);
    if(token){
        const decoded = validationAccesToken(token);
        if(decoded){
            req.user = {...decoded.user}
            next();
        }else{
            res.status(401).send(jsonResponse(401,{error:"No token provider"}))
        }
    }else{
        res.status(401).send(jsonResponse(401,{error:"No token provider"}))
    }
}
module.exports = authenticate;