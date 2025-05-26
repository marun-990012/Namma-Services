import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()
console.log(process.env.USER)
console.log(process.env.PASS)
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'arunlamani89@gmail.com',
        pass: 'zews qvqs puoj twdv', 
    },
}); 
