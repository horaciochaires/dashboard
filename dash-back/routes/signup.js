const router = require ("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user")

router.post("/",async (req,res)=>{
    const {userName,name,password} = req.body;

    if (!!!userName || !!!name || !!!password) {
        return res.status(400).json(jsonResponse(400, { error: 'Field are required' }));
    }
    // En esta parte se crea el usuario
    // const user = new User({
    //     userName,name,password
    // });
    const user = new User();
    const exist = await user.userNameExist(userName);
    if(exist){
        return res.status(400).json(jsonResponse(400,{
            error:"already exist"
        }))
    }
    const newUser = new User({
            userName,name,password
        });
        await newUser.save();

    res.status(200).json(jsonResponse(200, { message: 'User created successfully' }));

});




module.exports = router;