import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_CODE, 
    },
}); 
