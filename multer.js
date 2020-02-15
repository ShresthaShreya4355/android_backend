const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();

var storage = multer.diskStorage({
    destination : "image",
    filename: function(req, file, callback){
        const ext = path.extname(file.originalname);
        callback(null, "shreya" + Date.now() + ext);
    }
});

var upload = multer({storage: storage});

app.post('/upload', upload.single('files'), (req, res)=>{
    res.send();
})

app.listen(3000);