import mongoose from 'mongoose';

const connectDb = async ()=>{
    const url='mongodb://127.0.0.1:27017/namma-services'
    try{
        mongoose.connect(url);
        console.log('server connected to db');
    }catch(error){
        console.log(error);
    }
};

export default connectDb;