var React=require("react");
var ReactDOM=require("react-dom");

ReactDOM.render(
	//React.createElement('a',{href:'http://khoapham.vn'},'Khoa Pham')
	<form method="post" action="/login">
		<input type="text" name="username" placeholder="UserName"/>
		<input type="password" name="password" placeholder="Password"/>
		<input type="submit" value="Login"/>
	</form>
	,
	document.getElementById('root')
)