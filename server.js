import express from 'express';
const app = express();
const port=3040;

app.listen(port,()=>{
    console.log('Server is running on port',port);
});