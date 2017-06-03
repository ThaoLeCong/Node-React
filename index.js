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

app.get("/",function(req,res){
	res.render("home");
});