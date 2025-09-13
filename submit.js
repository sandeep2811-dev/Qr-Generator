import express from "express";
import fs from "fs";
import qr from "qr-image";
import bodyParser from "body-parser";
import path,{ dirname } from "path";
import { fileURLToPath } from "url";
const _dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res )=> {
    res.sendFile(_dirname + "/index.html");
});
app.post("/submit",(req,res)=>{
    const URL = req.body.url;
    if(!URL){
        res.status(404).send("Erorr: Resource not found");
    }
    else{
    console.log(URL);


    const qr_svg = qr.image(URL, { type: "png" });
    qr_svg.pipe(fs.createWriteStream(_dirname+"/public"+"/qr_img.png"));
    res.render("index.ejs")
    }
});


app.use(express.static(_dirname));

app.listen(3000,()=>{
    console.log("running at 3000");
});