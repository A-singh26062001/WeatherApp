
const { response } = require("express");
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res)
{
   res.sendFile(__dirname+"/index.html");
   
})
app.post("/",function(req,res)
{
    var cityName=(req.body.cityName);
    var units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=f63e862c353362d73869b8c3597a2082"+"&units="+units;
https.get(url,function(response)
{
    console.log(response.statusCode);
    
    response.on("data",function(data)
    {
        const weatherdata=JSON.parse(data);
        //console.log(weatherdata);
        const temp=weatherdata.main.temp
        const desc=weatherdata.weather[0].description
        const icon=weatherdata.weather[0].icon
        const url=" https://openweathermap.org/img/wn/"+icon +"@2x.png"
        
        res.write("<h1>The weather condition in "+cityName +" is "+ desc+"</h1>");
        res.write("<h2>The temperature in "+cityName +" is "+ temp+" Degreee Celcius</h2>");
        res.write("<img src="+url+">");
        res.send();
    })
})
    console.log(cityName);
    console.log("Post received");
})

app.listen(3000,function(req,res)
{
    console.log("Server started on port 3000")
})