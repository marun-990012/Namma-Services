import nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'arunlamani89@gmail.com',
        pass: 'zews qvqs puoj twdv', 
    },
}); 
