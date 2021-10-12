'use strict';

const axios = require('axios')
const mongoose= require('mongoose')
// server.get('/data',dataHandle)
function dataHandle(req,res){
    let url= `https://ltuc-asac-api.herokuapp.com/programmingLangData`
    axios.get(url).then(newData=> {
        let newArray = newData.data.map(item=>{
            return new Src(item)
        })
        res.send(newArray)
    })
}
class Src{
    constructor(item){
        this.title = item.title,
        this.image=item.imageUrl
    }
}

const dataSchema = new mongoose.Schema({
    email:String,
    title:String,
    image:String
})
const dataModel = mongoose.model('Exam',dataSchema)

// server.get('/get',getHandle)

//get?email?''

function getHandle(req,res){
    let {email} = req.query
    dataModel.find({email},function(error,data){
        if(error){console.log('Error in Read',error)}
        else{res.send(data)}
    })
}
// server.post('/post',postHandle)

//post , data

async function postHandle(req,res){
    let {email,title,image}=req.body
    await dataModel.create({
        email:email,title:title,image:image
    })
    await dataModel.find({email},function (error,data){
        if(error){console.log('Error in Add',error)}
        else{res.send(data)}
    })
}
// server.delete('/delete',deleteHandle)

// /delete?email='' &ID =''

function deleteHandle(req,res){
    let {email,ID}=req.query
    dataModel.deleteOne({_id:ID}).then(()=>{
        dataModel.find({email},function (error,data){
            if(error){console.log('Error in Delete',error)}
            else{res.send(data)}
        })
    })
}
// server.put('/put',putHandle)

// put , data

function putHandle(req,res){
    let {ID,email,title,image}=req.body
    dataModel.findByIdAndUpdate(ID,{email,title,image},(error,data)=>{
        if(error){console.log(error)}
        else{
            dataModel.find({email},function (error,data){
                if(error){console.log('Error in Delete',error)}
                else{res.send(data)}
            })
        }
    })
}
module.exports={
    data:dataHandle,
    get:getHandle,
    add:postHandle,
    delete:deleteHandle,
    update:putHandle
}