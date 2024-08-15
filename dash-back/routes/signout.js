const getTokenFromHeadres = require("../auth/getTokenFromHeader")
const Token = require("../schema/token")
const jsonResponse = require("../lib/jsonResponse")
const router = require ("express").Router();


router.delete("/",async(req,res)=>{
    try {
        const refreshToken = getTokenFromHeadres(req.headers);
        if(refreshToken){
            await Token.findOneAndRemove({token:refreshToken})
            res.status(200).json({message:"Token deleted"})
        }
    } catch (error) {
        res.status(404).json({error:"Token deleted"})
    }
});

module.exports = router;