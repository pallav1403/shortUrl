const express =require("express");
const router =express.Router();

const validUrl =require("valid-url");//checking url is valid or not
const shortId =require("shortuuid");//giving short id
const {BASE_URL} =require("../config");//base url
const Url =require("../models/Url");//loading schema from model
router.post("/shorten",async(req,res)=>{
    const {longUrl}=req.body;
    if(!validUrl.isUri(BASE_URL))
    {
        return res.status(401).json("INVALID BASE URL PLEASE PROVIDE VALID URL");
    }
    //GENERATE SHORT URL
    const urlCode =shortId.generate();
    if(validUrl.isUri(longUrl)){
        try {
            let url=await Url.findOne({longUrl});
            if(url){
                res.json(url);
            }
            else{
             const shortUrl =BASE_URL+"/"+urlCode;
             url =new Url({
                 longUrl,
                 shortUrl,
                 urlCode
             });
             await url.save();
             res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json("SERVER ERROR")
        }}
        else{
        res.status(401).json("INVALID LONG URL")
        }
    
});
module.exports=router;
