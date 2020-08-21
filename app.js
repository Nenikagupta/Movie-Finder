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

  const s="home";
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
    res.render("index",{movies:Actual_data.Search});
    });

  });

});


app.post("/",function(req,res){
  const movie_name=req.body.input_movie;
  const type=req.body.type;

  const omdbapiURL=omdbapi+"?s="+movie_name+"&type="+type+"&apikey="+apikey;

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
    console.log(Actual_data);
    if (Actual_data.Error) {
        res.render("error");
    }else{
        res.render("index",{movies:Actual_data.Search});
    }

    });

  });

});

app.post("/details",function(req,res){
  const movie_id=req.body.movie_detail;

  const omdbapiURL=omdbapi+"?i="+movie_id+"&apikey="+apikey;

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
     res.render("movieDetail",{movie:Actual_data});
    });

  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
  console.log("Server has started at host"+ port);
});



//Api key-5343a78a
