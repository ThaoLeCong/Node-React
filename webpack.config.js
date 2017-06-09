const path = require('path');
module.exports={
	entry:'./app/app.jsx',
	output:{
		path:__dirname,
		filename:'./public/bundle.js'
	},
	resolve:{
		modules: [
      		"node_modules",
      		path.resolve(__dirname, "./app/comps/")
    	],
		alias:{
			 "HomePage": path.resolve(__dirname, "./app/comps/HomePage.js"),
			 "Main": path.resolve(__dirname, "./app/comps/Main.js"),
			 "Nav": path.resolve(__dirname, "./app/comps/Nav.js"),
			 "Account": path.resolve(__dirname, "./app/comps/Account.js"),
			 "Help" : path.resolve(__dirname,"./app/comps/Help.js"),
			 "Login" : path.resolve(__dirname,"./app/comps/Login.js"),
		}
	},
	module:{
		loaders:[
		{
			loader:'babel-loader',
			query:{
				presets:['react','es2015']
			},
			test:/\.jsx?$/,
			exclude: /node_modules/
		}
		]
	}
};