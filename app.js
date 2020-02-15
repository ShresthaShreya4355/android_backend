require('./database/mongoose');
const cors = require('cors');
const path = require("path");
const express = require('express');
const app = express();
app.use(cors());


const bodyParser = require('body-parser');

const userRoute = require('./routers/userRoute');
const categoryRoute = require('./routers/categoryRoute');

const publicdirectory= path.join(__dirname,'public');
app.use(express.static(publicdirectory));


app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(userRoute);
app.use(categoryRoute);


app.listen(3000, function () {
    console.log("Server started!")
});