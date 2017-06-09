var React=require("react");
var ReactDOM=require("react-dom");
var {Router,Route,IndexRoute,hashHistory}=require("react-router");

var HomePage=require("HomePage");
var Main=require("Main");
var Nav=require("Nav");
var Account=require("Account");
var Help=require("Help");
var Login=require("Login");

ReactDOM.render(
	<Router history={hashHistory}>
		<Router path="/" component={Main}>
			<IndexRoute component={HomePage}/>
			<Route path="account" component={Account}/>
			<Route path="help" component={Help}/>
			<Route path="login" component={Login}/>
		</Router>
	</Router>
	,
	document.getElementById('root')
);