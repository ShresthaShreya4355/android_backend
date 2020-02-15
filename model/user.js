const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');

const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    image: {
        type: String
    },
    tokens:[{
        token:{
            type: String,
            required: true

        }
    }]
   
})

userSchema.statics.checkCrediantialsDb = async (user22, pass) =>{

    const user1 = await User.findOne({email : user22, password : pass})
     return user1;
    }

    userSchema.methods.generateAuthToken = async function () {
        const user = this
       const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
       
       console.log(token);
        user.tokens = user.tokens.concat({ token :token })
        await user.save()
        return token
       }

const User = mongoose.model('User', userSchema);
module.exports = User ;