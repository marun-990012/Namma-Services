import Address from "../models/address-model.js";
const addressController = {};

//add address controller
addressController.createAddress = async(req,res)=>{
    const {street,city,state,postalCode,country} = req.body;
    try{
        const address = await Address.create({street,city,state,postalCode,country,userId:req.userId});
        return res.state(201).json(address);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Something went wrong'});
    }
};

//update address controller
addressController.updateAddress = async(req,res)=>{
    const id = req.params.id;
    const {street,city,state,postalCode,country} = req.body;
    try{
        const address = await Address.findByIdAndUpdate(id,{street,city,state,postalCode,country},{new:true});
        if(!address){
            return res.status(404).json({error:'Record not found'});
        }
        return res.state(201).json(address);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Something went wrong'});
    }
};
export default addressController;