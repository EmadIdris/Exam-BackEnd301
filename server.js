'use strict';

// https://ltuc-asac-api.herokuapp.com/programmingLangData

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGO}`);

const server = express();
server.use(cors());
server.use(express.json());

const allModule = require('./Module/Data')
const dataHandle = allModule.data;
const getHandle=allModule.get;
const postHandle=allModule.add;
const deleteHandle = allModule.delete;
const putHandle=allModule.update;

const PORT = process.env.PORT

// Route For Data
server.get('/data',dataHandle)
//Route For DB
server.get('/get',getHandle)
server.post('/post',postHandle)
server.delete('/delete',deleteHandle)
server.put('/put',putHandle)

server.get('/',homeHandle)
function homeHandle(req,res){
    res.send('Working Good')
}

server.listen(PORT,()=>{
    console.log(`Working on: ${PORT}`);
})
