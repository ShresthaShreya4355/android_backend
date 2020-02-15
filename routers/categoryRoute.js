const express = require('express');
const category = require('../model/category');
const Post = require('../model/post');
const upload = require('../middleware/uploadfile')
const router = new express.Router();

router.post("/addcategory", upload,(req, res) => {
    req.files.map(function (items) {
        const addCat = new category({
            category_name: req.body.category_name,
            image: items.filename,
        })
        addCat.save().then(function () {
            res.send("Category has been added")
        }).catch(function (e) {
            res.send(e)
        })
    })
})

router.get("/getcategory", (req, res) => {
    const getCat = category.find().then(function (getCat) {
        res.send(getCat)
    }).catch(function (e) {
        res.send(e)
    })
})

router.post("/addpost", upload, (req, res) => {
    req.files.map(function (items) {
        const addpost = new Post({
            user_id: req.body.user_id,
            title: req.body.title,
            category_id: req.body.category_id,
            description: req.body.description,
            image: items.filename
        })

        addpost.save().then(function () {
            res.send("Post has been added")
        }).catch(function (e) {
            res.send(e)
        })
    })
})

router.get('/getcontainbycategory/:_id',(req,res)=>{
 
    Post.find({category_id:req.params._id}).populate('user_id').populate('category_id').then(function (getpost) {
        res.send(getpost)
    }).catch(function (e) {
        res.send(e)
    })

})

router.get('/getContainById/:_id',(req, res)=>{
    Post.findById(req.params._id).populate('user_id').populate('category_id').then(function (getpost){
        res.send(getpost)
    }).catch(function(e){
        res.send(e)
    })
})

router.get('/category/:id', (req, res)=>{
    category.findById({_id: req.params.id}, (err, result) => {
        if(err){
            res.send(err)
        } else {
            res.send(result)
        }
    })
})


module.exports = router;
