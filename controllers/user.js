const User = require('../models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const {StatusCodes} = require('http-status-codes')


const register = async (req, res) => {
    const {name, email} = req.body
       User.findOne({email}).exec((err, user) =>{
           
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
        const mailOptions = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: 'Account Activation Link',
            html: `
            <body style="background-color:white; padding:5px; height:100%; width:100%>
            <div style="text-align:left; padding:20px">
         
         
             <h4>foxfund.company@outlook.com/emailverification</>
             <h2>Hi ${name}! <br/> You are good to go...</h2>
            <p>Kindly copy the and paste the code below to login</p> <br/>
      
            code:  <p value=${verificationCode} style="padding:10px; font-size:20px; text-alig:left !important; color:black; background-color: inherit; font-weight:400">${verificationCode}</p>
           
            <p>If you didn't request this code, you can safely ignore this message. Someone might have typed your email address by mistaken <br/> Thanks.</p>
            </div>
            </body>
            
            `
        };
        transporter.sendMail(mailOptions, function(error, body){
            if(error){
                return res.json({error: error})
            }
            res.json({message: 'Email has be sent to you, kindly activate your accoutn to continue', code:verificationCode, name:name })
        })
    })
}

module.exports = {register}