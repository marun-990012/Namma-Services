import axios from "axios";
import Address from "../models/address-model.js";
const addressController = {};

//add address controller
addressController.createAddress = async(req,res)=>{
    const {street,city,state,postalCode,country} = req.body;
    const apiKey = '414f3b4ff1ad47088654fae1b1c6ca01';
    const encodedAddress = encodeURIComponent(`${street} ${city} ${postalCode} ${state} ${country}`);
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${apiKey}`;
    try{

        const address = await Address.findOne({userId:req.userId});

        if(!address){
            const response = await axios.get(url);
            const location = response.data.features[0].properties;
            if(location){
                const address = await Address.create({address:location.formatted,street,city,state,postalCode,country,location: {type: 'Point',coordinates: [location.lon, location.lat]},userId:req.userId});
                return res.status(201).json(address);
            }else{
                return res.status(404).json({error:'enter valid address'});
            }
        }
        return res.json({message:'Address already created'});
        
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Something went wrong'});
    }
};

//update address controller
addressController.updateAddress = async(req,res)=>{
    const id = req.params.id;
    const {street,city,state,postalCode,country} = req.body;
    const apiKey = '414f3b4ff1ad47088654fae1b1c6ca01';
    const encodedAddress = encodeURIComponent(`${street} ${city} ${postalCode} ${state} ${country}`);
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${apiKey}`;
    try{
        const response = await axios.get(url);
        const location = response.data.features[0].properties;
        const address = await Address.findOneAndUpdate({_id:id,userId:req.userId},{address:location.formatted,street,city,state,postalCode,country,location: {type: 'Point',coordinates: [location.lon, location.lat]}},{new:true});
        if(!address){
            return res.status(404).json({error:'Record not found or unauthorized access'});
        }
        return res.status(201).json(address);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Something went wrong'});
    }
};

addressController.find = async(req,res)=>{
    try {
        const address = await Address.findOne({userId:req.userId});
        return res.json(address);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Something went wrong'});
    }
}
export default addressController;