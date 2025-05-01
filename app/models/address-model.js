import mongoose from 'mongoose';

const {Schema,model} = mongoose;

const addressSchema = new Schema({
  user:Schema.Types.ObjectId,
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: {
    type: String,
    default: 'India'
  },
  latitude: {
    type: Number,
    default: null
  },
  longitude: {
    type: Number,
    default: null
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
      default: [0, 0]
    }
  }
});