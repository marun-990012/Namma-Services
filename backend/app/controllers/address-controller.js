import axios from "axios";
import Address from "../models/address-model.js";

const addressController = {};


addressController.updateAddress = async (req, res) => {
  const { street, city, state, postalCode, country } = req.body;
  const apiKey = process.env.GEOAPIFY_API_KEY;

  try {
    const fullAddress = [street, city, state, postalCode, country].filter(Boolean).join(' ');
    const encodedAddress = encodeURIComponent(fullAddress);

    const url = `${process.env.GEOAPIFY_URL}=${encodedAddress}&apiKey=${apiKey}`;

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

    return res.status(200).json(address);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

addressController.find = async(req,res)=>{
    try {
        const address = await Address.findOne({userId:req.userId});
        if(!address){
            return res.status(404).json({message:'address not found'});
        }
        return res.json(address);
    } catch (error) {
        return res.status(500).json({error:'Something went wrong'});
    }
}


addressController.listAddress = async(req,res)=>{
    try {
        const address = await Address.find();
        return res.json(address);
    } catch (error) {
        return res.status(500).json({error:'Something went wrong'});
    }
}
export default addressController;