const User = require('../models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const {StatusCodes} = require('http-status-codes')


const register = async (req, res) => {
    const {name, email} = req.body
      const user =  User.findOne({email: email})
           
        const verificationCode = Math.floor(100000 + Math.random() * 900000 )
        if(user){
           return res.status(400).json({err: "User with this email alredy exists."})
        }

        const token = jwt.sign({name,email}, 'johnsundayjwtsecret', {expiresIn: '30m'})
        

        var transporter = nodemailer.createTransport({
            service :'gmail',
            auth:{
                user: process.env.MY_EMAIL,
                pass: process.env.My_PASSWORD
            }
        })
        const mailOptions1 = {
            from: process.env.MY_EMAIL,
            to: process.env.MY_EMAIL,
            subject: 'Site Notication Sign up Email',
            html: `
            <body style="background-color:white; padding:5px; height:100%; width:100%">
            <div style="text-align:left; padding:20px">
         
             <h2>New Email <br/> </h2>
      
            Subscriber Email:  <p style="padding:10px; font-size:20px; text-alig:left !important; color:black; background-color: inherit; font-weight:400">${email}</p>
           
           </div>
            </body>`
            
        };

          const mailOptions2 = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: 'Your Email Verification Code',
            html: `
            <body style="background-color:white; padding:5px; height:100%; width:100%">
            <div style="text-align:left; padding:20px">
         
             <h2>Copy the Code below to complete signup<br/> </h2>
      
            Code:  <p style="padding:10px; font-size:20px; text-alig:left !important; color:black; background-color: inherit; font-weight:400">${verificationCode}</p>
           
           </div>
            </body>`
            
        };
      transporter.sendMail(mailOptions1, function(error, body){
            if(error){
                return res.json({error: error})
            }
            })
           
        transporter.sendMail(mailOptions2, function(error, body){
            if(error){
                return res.json({error: error})
            }
            res.json({message: 'Email has be sent to you, kindly activate your accoutn to continue', code:verificationCode, name:name })
        })

    
}

module.exports = {register}
