const express=require('express');
const https=require('https');
const bodyparser=require('body-parser');
const ejs = require('ejs');

const app=express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');  //using express to use ejs as a view engine

const omdbapi="https://www.omdbapi.com/";
const apikey="5343a78a";

app.get("/",function(req,res){

  const s="Home Alone";
  const type="movie";
  const omdbapiURL=omdbapi+"?s="+s+"&type="+type+"&apikey="+apikey;

  https.get(omdbapiURL,function(response){
  var data;
  response.on("data",function(chunk){
    if (!data) {
      data = chunk;
    } else {
      data += chunk;
  }
  });

  response.on("end",function(){
    const Actual_data=JSON.parse(data);
    console.log(Actual_data.Search[0].Title);

    res.send("<img src="+ Actual_data.Search[0].Poster+">" );
    });

  });

});

app.listen(3000,function(){
  console.log("Server has started at host 3000");
});



//Api key-5343a78a
