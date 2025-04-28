import User from '../models/user-model.js';
const userController={};

userController.register = async(req,res)=>{
    // res.json('hello server')
    const body = req.body;
    // console.log(body);
    try{
        const user = await User.create(body);
        return res.status(201).json(user);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Soething went wrong"})
    }
}

userController.login = async(req,res)=>{
    res.json('hello server')
}
export default userController;