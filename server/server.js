const express = require('express')
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const db = require('./DB/db');
const cors = require('cors')
const port = process.env.PORT || 5000
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

db();
const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(errorHandler)
app.use('/api/admin',require('./Admin/Route'))
app.use('/api/employes',require('./Employes/Route'))


app.listen(port, ()=>{ 
    console.log(`server runing on localhost: ${port}`)
})
