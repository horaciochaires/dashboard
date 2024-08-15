const router = require ("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");
const getUserInfo = require('../lib/getUserInfo')
router.post("/",async (req,res)=>{
    const {userName,password} = req.body;

    if (!!!userName || !!!password) {
        return res.status(400).json(jsonResponse(400, { error: 'Field are required' }));
    }

    const user = await User.findOne({userName})

    if (user) {
        const correctPass = await user.comparePassword(password,user.password);
        if(correctPass){
            const accessToken = user.createAccessToken();
            const refreshToken =  await user.createRefreshToken();
            res.status(200).json(jsonResponse(200,{
                user: getUserInfo(user),accessToken,refreshToken
            }));
        }else{
            res.status(400).json(jsonResponse(400,{
                error:"user or password invalid"
               })) 
        }
    }else{
       res.status(400).json(jsonResponse(400,{
        error:"user or password invalid"
       })) 
    }
    // // autenticacion
    // const accessToken = 'access_token';
    // const refreshToken = 'refresh_token';
    // // const user = {
    // //     id: "1",
    // //     name: "admin",
    // //     userName:"Admin"
    // // };
    // res.status(200).json(jsonResponse(200, { user,accessToken,refreshToken }));

});




module.exports = router;