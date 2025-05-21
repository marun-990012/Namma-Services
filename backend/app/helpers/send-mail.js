import nodemailer from 'nodemailer';
import { transporter } from '../../config/nodemailer.js';
import { verificationEmailTemplate,welcomeEmailTemplate } from './email-template.js';

export const sendVerificationEamil=(user)=>{
  
    const mailOptions = {
        from: 'arunlamani89@gmail.com',
        to: user.email,
        subject: user.message,
        text: user.message,
        html:verificationEmailTemplate.replace("{verificationCode}",user.verificationToken)
    };

    try{
        transporter.sendMail(mailOptions);
    }catch(error){
        console.log(error)
    }
};


export const senWelcomeEmail=async(user)=>{
    const mailOptions = {
        from: 'arunlamani89@gmail.com',
        to: user.email,
        subject: user.message,
        text: user.message,
        html:welcomeEmailTemplate.replace("{name}",user.name)
    };

    try{
        transporter.sendMail(mailOptions);
    }catch(error){
        console.log(error)
    }
};


export const sendResetPasswordEmail = async(data)=>{
    const mailOptions = {
        from: 'arunlamani89@gmail.com',
        to: data.email,
        subject: 'resete possword',
        text: data.token,
        html:welcomeEmailTemplate.replace("{name}",data.token)
    };

    try{
        transporter.sendMail(mailOptions);
    }catch(error){
        console.log(error)
    }
};



export const sendConsiderNotification = async(data)=>{
    // console.log('invoked',data)
    const mailOptions = {
        from: 'arunlamani89@gmail.com',
        to: data.email,
        subject: 'Consider for Work',
        text: `Good news! You're in consideration for the ${data.title} job.` ,
        // html:welcomeEmailTemplate.replace("{name}",data.token)
    };

    try{
        transporter.sendMail(mailOptions);
    }catch(error){
        console.log(error)
    }
}


export const sendSelectNotification = async(data)=>{
    // console.log('invoked',data)
    const mailOptions = {
        from: 'arunlamani89@gmail.com',
        to: data.email,
        subject: 'Selected for Work',
        text: `Good news! You're Selected for the ${data.title} job.` ,
        // html:welcomeEmailTemplate.replace("{name}",data.token)
    };

    try{
        transporter.sendMail(mailOptions);
    }catch(error){
        console.log(error)
    }
}