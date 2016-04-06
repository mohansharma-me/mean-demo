var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var methodOverride=require("method-override");
var mongoose=require("mongoose");
var morgan=require("morgan");
var session=require("express-session");

var db=require("./config/db");
var port=3000;

mongoose.connect(db.url);

app.use(morgan('dev'));
app.use(session({secret:"9722505033", resave:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:"application/vnd.api+json"}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname+"/public"));

require("./app/routes")(app);

app.listen(port);
exports=module.exports=app;
