var express=require("express");
var app=express();

app.set("view engine","ejs");
app.set("views","./views");

app.use(express.static("./public"));
var server=require("http").Server(app);
var io=require("socket.io")(server);
var session=require("express-session");
const fs=require("fs");

server.listen(3000,function(){
	console.log("server started");
});
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
var pg=require("pg");
var flash=require("connect-flash");
const Passport=require("passport");
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
app.use(session({
    secret: "thao1102",
    resave: true,
    saveUninitialized: true }));
app.use(Passport.initialize());
app.use(Passport.session());
app.use(flash());
const sequelize=require("sequelize");

// cấu hình kết nối db vs sequelize
const db = new sequelize( {
	database:'DaihoianhhungDB',
	username:'postgres',
	password:'thao1102',
	host: 'localhost',
	port:5432,
	dialect:'postgres',
	dialectOptions:{ssl:false},
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	define:{
		freezeTableName: true
	}
});
// test kết nối
db.authenticate()
.then(() => {
	console.log('Connection has been established successfully.');
})
.catch(err => {
	console.error('Unable to connect to the database:', err);
});
// create table
const User = db.define('account', {
  	username: {
    	type: sequelize.STRING
  	},
  	password: {
    	type: sequelize.STRING
  	},
  	email:{
  		type: sequelize.STRING
  	}
});

app.get("/",function(req,res){
	res.render("home");
});
app.get("/tintuc/:id",function(req,res){
	if(req.isAuthenticated())
	{
		var id=req.params.id;
		res.send("tin tức");
	}
	else
	{
		res.send("bạn chưa đăng nhập");
	}
	
});
app.post("/login",Passport.authenticate('local', { successRedirect: '/tintuc/1',
                                   failureRedirect: '/',
                                   failureFlash: true })
);
app.get("/login",function(req,res){
	res.render("login");
});

Passport.use(new LocalStrategy(
 	function(username, password, done) {
 		console.log("đang check");
 		User.findOne({where:{username:username}}).then(user=>{
 			if (!user) {
 				return done(null, false, { message: 'Incorrect username.' });
 			}
 			if (user.get('password')!=password) {
 				return done(null, false, { message: 'Incorrect password.' });
 			}
 			console.log("Đăng nhập thành công");
 			return done(null, user);
 		}); 
 	}
));
Passport.serializeUser(function (user, done) {
	done(null, user.username);
});
Passport.deserializeUser(function (username, done) {
	User.findOne({where:{username:username}}).then(user=>{
 		if (!user) {
 			console.log("bạn chưa đăng nhập");
 			return done(null, false, { message: 'Incorrect username.' });
 		}
 		return done(null, user);
 		}); 
});

Passport.use(new FacebookStrategy({
    clientID: 734280883409750,
    clientSecret: '76ebf7f12ec59486f0a215c29662ce6a',
    callbackURL: "http://localhost:3000/auth/facebook"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log(profile.displayName);
    User.findOrCreate({where:{username:profile.displayName,email:profile.email}}).spread((user, created) => {
    	console.log(user.get({
      		plain: true
    	}));
    	console.log(created);
    	if(created)
    	{
    		done(null, user);
    	}
  	});
  }
));
app.get('/auth/facebook',
Passport.authenticate('facebook', { successRedirect: '/tintuc/1',
                                      failureRedirect: '/' }));
