const nodemailer = require('nodemailer');

function sendMail({from,to,subject,text,htm}){
        let transporter = nodemailer.createTransport({
            host: process.env
        });
}


module.exports =  sendMail;