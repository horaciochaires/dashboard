const jtw = require("jsonwebtoken")

function sign(payload,isAccessToken) {
    return jtw.sign(payload, isAccessToken ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET, {
        algorithm:"HS256",
        expiresIn:3600,
    })
}
function generateAccessToken(user) {
    return sign({user},true)
}
function generateRefreshToken(user) {
    return sign({user},false)
    
}

module.exports = {generateAccessToken ,  generateRefreshToken}