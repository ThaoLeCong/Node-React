import React from 'react';
class Login extends React.Component{
	render(){
		return (
			<form method="post" action="/login">
				<input type="text" name="username" placeHolder="UserName" autoComplete="off"/>
				<input type="password" name="password" placeHolder="Password" autoComplete="off"/>
				<input type="submit" value="Login"/>
			</form>
		)
	}
}
module.exports=Login;