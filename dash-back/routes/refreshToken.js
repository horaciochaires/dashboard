const { json } = require("express");
const getTokenFromHeader = require("../auth/getTokenFromHeader");
const { jsonResponse } = require("../lib/jsonResponse");
const Token = require("../schema/token");
const { validationRefreshToken } = require("../auth/validateToken");
const { generateAccessToken } = require("../auth/generateTokens");
const router = require ("express").Router();

router.post("/",async(req,res)=>{
    const refreshToken = getTokenFromHeader(req.headers);
    console.log();
    if(refreshToken){
        try {
            const found = await Token.findOne({token:refreshToken})
            if(!found){
                return res.status(401).send(jsonResponse(401,{error:"Unauthorized4"}))
            }
            const payload = validationRefreshToken(found.token)
            if(payload){
                const accessToken = generateAccessToken(payload.user);
                return res.status(200).json(jsonResponse(200,{accessToken}))
            }else{
                return res.status(401).send(jsonResponse(401,{error:"Unauthorized3"}))
            }
        } catch (error) {
            return res.status(401).send(jsonResponse(401,{error:"Unauthorized2"}))
        }
    }else{
        res.status(401).send(jsonResponse(401,{error:"Unauthorized1"}))
    }
   
});

module.exports = router;