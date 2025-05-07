import mongoose from 'mongoose';

const {Schema,model} = mongoose;

const addressSchema = new Schema({
  userId:Schema.Types.ObjectId,
  address:String,
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: {
    type: String,
    default: 'India'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    }
  }
});


const Address = model('Address',addressSchema);

export default Address;