const User = require('../model/user');
const Post = require('../model/post');
const upload = require('../middleware/uploadfile')
const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post("/login", async (req,res)=>{
    try{
        const user = await User.checkCrediantialsDb(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        const id = await user._id
        console.log({id, token})
        res.send({
            token:token,
            name:user.name,
            email:user.email,
            password: user.password,
            _id: user._id
        })
    }
    catch{
        res.send("login failed")
    }
})

    router.post("/register", (req,res)=>{
        console.log(req.body)
        const data = new User(req.body);
        data.save();
        res.send(data)
    });

    router.get('/search/:title', (req, res)=>{
        const title = req.params.title;
        Post.find({title: {$regex: title, $options: "i"}}).populate('user_id').populate('category_id').then(function(err, data){
            if(err){
                res.send(err)
            } else {
                res.send(data)
                console.log(data)
            }
        })
    })

    router.get("/user/details/:id", (req,res)=>{
        User.findById(req.params.id).then(function(user_data){
            res.send(user_data);
        }).catch(function(e){
            res.send(e);
        })
    })

    router.put("/user/update/:id", (req,res)=>{
        User.findOneAndUpdate({_id: req.params.id}, req.body).then(function(user_data){
            res.send("User profile updated!");
        }).catch(function(e){
            res.send(e);
        })
    })

    //router to update profile picture
router.put("/user/photo/:id", upload, (req, res) => {
    req.files.map(function(img){
        var image = img.filename
    
        User.findOneAndUpdate({_id: req.params.id}, {'image': image}, { upsert: true }, (err, docs) => {
            if (err) {
                return res
                    .status(500)
                    .send({error: "unsuccessful"})

            } else {
                console.log(image)
                res.send("Profile Picture Update Successfull!"+docs)
            }
        })
    })
})

    module.exports=router;