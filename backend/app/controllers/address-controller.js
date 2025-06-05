import axios from "axios";
import Address from "../models/address-model.js";
const addressController = {};

// //add address controller
// addressController.createAddress = async(req,res)=>{
//     const {street,city,state,postalCode,country} = req.body;
//     const apiKey = '414f3b4ff1ad47088654fae1b1c6ca01';
//     const encodedAddress = encodeURIComponent(`${street} ${city} ${postalCode} ${state} ${country}`);
//     const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${apiKey}`;
//     try{

//         const address = await Address.findOne({userId:req.userId});

//         if(!address){
//             const response = await axios.get(url);
//             const location = response.data.features[0].properties;
//             if(location){
//                 const address = await Address.create({address:location.formatted,street,city,state,postalCode,country,location: {type: 'Point',coordinates: [location.lon, location.lat]},userId:req.userId});
//                 return res.status(201).json(address);
//             }else{
//                 return res.status(404).json({error:'enter valid address'});
//             }
//         }
//         return res.json({message:'Address already created'});
        
//     }catch(error){
//         console.log(error);
//         return res.status(500).json({error:'Something went wrong'});
//     }
// };




//update address controller
// addressController.updateAddress = async(req,res)=>{
//     const {street,city,state,postalCode,country} = req.body;
//     const apiKey = '414f3b4ff1ad47088654fae1b1c6ca01';
//     const encodedAddress = encodeURIComponent(`${street} ${city} ${postalCode} ${state} ${country}`);
//     const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${apiKey}`;
//     try{
//         const response = await axios.get(url);
//         const location = response.data.features[0].properties;
//         const address = await Address.findOneAndUpdate({userId:req.userId},{address:location.formatted,street,city,state,postalCode,country,location: {type: 'Point',coordinates: [location.lon, location.lat]}},{new:true});
//         if(!address){
//             return res.status(404).json({error:'Record not found or unauthorized access'});
//         }
//         return res.status(201).json(address);
//     }catch(error){
//         console.log(error);
//         return res.status(500).json({error:'Something went wrong'});
//     }
// };

addressController.updateAddress = async (req, res) => {
  const { street, city, state, postalCode, country } = req.body;
  const apiKey = '414f3b4ff1ad47088654fae1b1c6ca01';

  try {
    const fullAddress = [street, city, state, postalCode, country].filter(Boolean).join(' ');
    const encodedAddress = encodeURIComponent(fullAddress);

    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${apiKey}`;

    const response = await axios.get(url);

    if (!response.data.features || response.data.features.length === 0) {
      return res.status(404).json({ error: 'No location found for the given address' });
    }

    const firstFeature = response.data.features[0];
    const location = firstFeature.properties;
    const geometry = firstFeature.geometry; // GeoJSON geometry

    const address = await Address.findOneAndUpdate(
      { userId: req.userId },
      {
        address: location.formatted,
        street,
        city,
        state,
        postalCode,
        country,
        location: {
          type: 'Point',
          coordinates: geometry.coordinates, // [lon, lat]
        },
      },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ error: 'Record not found or unauthorized access' });
    }

    // console.log(address)
    return res.status(201).json(address);
  } catch (error) {
    console.error('Geoapify geocoding error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

addressController.find = async(req,res)=>{
    try {
        const address = await Address.findOne({userId:req.userId});
        if(!address){
            return res.status(404).json({message:'address not found'});
        }
        console.log('address',address)
        return res.json(address);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Something went wrong'});
    }
}


addressController.listAddress = async(req,res)=>{
    try {
        const address = await Address.find();
        return res.json(address);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Something went wrong'});
    }
}
export default addressController;