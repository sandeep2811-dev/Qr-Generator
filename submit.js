import express from "express";
import fs from "fs";
import qr from "qr-image";
import bodyParser from "body-parser";
import path,{ dirname } from "path";
import { fileURLToPath } from "url";
const _dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res )=> {
    res.sendFile(_dirname + "/index.html");
});
app.post("/submit",(req,res)=>{
    const URL = req.body.url;
    console.log(URL);


    const qr_svg = qr.image(URL, { type: "png" });
    qr_svg.pipe(fs.createWriteStream(_dirname+"/qr_img.png"));
    res.send('<center><img src="./qr_img.png" height="500vh" width="500"><h2>Qr-code Generated</h2><form action="/" method="get"><button type="submit" style="border-radius:5px; height:50px;width:150px;"><h3>Back</h3></button></form><center>');



});


app.use(express.static(_dirname));

app.listen(3000,()=>{
    console.log("running at 3000");
});