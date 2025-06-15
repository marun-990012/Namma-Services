import mongoose from 'mongoose';

const connectDb = async ()=>{
    const url = process.env.DB_URL;
    try{
        mongoose.connect(url);
        console.log('server connected to db');
    }catch(error){
        console.log(error);
    }
};

export default connectDb;