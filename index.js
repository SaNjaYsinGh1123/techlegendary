const express = require('express');
const app = express();
const db = require('./config/db');
const cors = require('cors');

app.use(express.json());

app.use(express.urlencoded());

app.use(cors());

app.use('/',require('./routes/index'));

app.listen(process.env.Port || 8000,function(){
    console.log('backend is running');
})

module.exports = app;