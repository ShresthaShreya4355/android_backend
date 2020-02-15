const express = require('express');
const bodyparser = require('body-parser');
const User = require('../model/user');
const router = new express.Router();

const auth = require('../middleware/auth');

const app = express();


router.post("/login", async (req,res)=>{
try{
    const user = await User.checkCrediantialsDb(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    const id = await user._id
    console.log({id, token})
    res.send(user)
}
catch{
    res.send("login failed")
}
})

router.get("/users",(req,res)=>{
    User.find().then(function(user_data){
        res.send(user_data);
    }).catch(function(e){
        res.send(e);
    })

});

router.get("/users/user/:id", function(req,res){
    User.findOne({_id:req.params.id}).then(function(user_data){
        res.send(user_data);
    }).catch(function(e){
        res.send(e);
    })
});

router.post("/register", (req,res)=>{
    console.log(req.body)
    const data = new User(req.body);
    data.save();
    res.send(data)
});

router.delete('/delete/:id',(req,res)=>{
    User.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted");
    }).catch(function(e){
        res.send(e);
    })
});

router.put('/update/:id',(req,res)=>{
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        res.send("Updated");
    }).catch(function(e){
        res.send(e);
    })
});

router.get('/admin_dashboard', auth,(req,res)=>{
    user_type = req.user_type
    if(user_type=="admin"){
        res.send("hello Admin")
    }
    else{
    res.send("please authentication")
    }
})

router.get('/student_dashboard', auth,(req,res)=>{
    user_type = req.user_type
    if(user_type=="student"){
        res.send("hello student")
    }
    else{
    res.send("please authentication")
    }
})

router.post('/logout', auth,async(req, res)=>{
    try{
        req.user.token = req.user.token.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch(e){
        res.status(500).send()
    }
})
module.exports = router;