const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


var neString = ""
var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
var string_length = 16
var randomstring = ""
for (let i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length)
    randomstring += chars.substring(rnum,rnum+1) 
    if (randomstring.length === 16) {
        
        neString = randomstring
    }
    
    
}

const verificationCode = Math.floor(100000 + Math.random() * 900000 )

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        minlength:3,
        required: [true, 'please provide an name'],
        maxlength: [20, "name must not be greater than 20 characters"]
    },
    email:{
        type: String,
        unique:true,
        trim:true,
        required: [true, 'please provide an email'],
        maxlength: [50, "name must not be greater than 20 characters"]
    }
}, {timestamps:true})

    UserSchema.pre('save', async function(){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        
    })
    
    
module.exports = mongoose.model('User', UserSchema)
