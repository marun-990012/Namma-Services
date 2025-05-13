import Address from "../models/address-model.js";
export const createBlankAddressForUser = async (userId) => {
  return await Address.create({
    userId,
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    address: '',
    location: {
      type: 'Point',
      coordinates: [0, 0],
    },
  });

};


export const updateAddress = async()=>{
  try{

  }catch(error){
    
  }
}