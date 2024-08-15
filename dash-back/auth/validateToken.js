const jwt = require("jsonwebtoken");

function validationAccesToken(token){
    return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
}
function validationRefreshToken(token){
    return jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
    
}
module.exports = {validationAccesToken,validationRefreshToken}