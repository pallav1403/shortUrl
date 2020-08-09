const express =require("express");
const Url =require("../models/url");
const router =express.Router();

router.get("/:code",async(req,res)=>{
    try {
        const url =await Url.findOne({ urlCode:req.params.code});
        if(url){
            return res.redirect(url.longUrl);
        }
        else{
            return res.status(404).json("INVALID URL OR URL NOT FOUND");
        }


    } catch (err) {
        console.error(err);
        res.status(500).json("SERVER ERROR")
    }
});
module.exports=router;