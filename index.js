var express=require("express");
var app=express();

app.set("view engine","ejs");
app.set("views","./views");

app.use(express.static("./public"));
var server=require("http").Server(app);
var io=require("socket.io")(server);

server.listen(3000,function(){
	console.log("server started");
});
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get("/",function(req,res){
	res.render("home");
});
app.get("/tintuc/:id",function(req,res){
	var id=req.params.id;
});
app.post("/login",urlencodedParser,function(req,res){
	if (!req.body) 
		{
			return res.sendStatus(400);
		}
	var u=req.body.username;
	var p=req.body.password;
 	res.send('welcome, ' + u)
});