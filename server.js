const express=require("express");
const {MONGODB_URL,PORT,BASE_URL}= require("./config");
const app=express();

const { connect} =require("mongoose");
//connect to db
connect(
    MONGODB_URL,(err)=>{
        if(err) throw err;
        console.log("DATABASE CONNECTED");
    }
);
//express middleware json parsing
app.use(express.json({ extended:false}));//parsing json file

//load routes here
app.use("/",require("./route/index"));
app.use("/api/url",require("./route/url"));
//PORT LISTEN
app.listen(PORT,(err)=>{
    if (err) throw err;
    console.log("server is running on port no: "+PORT) ;
});