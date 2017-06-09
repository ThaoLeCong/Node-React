import React from 'react';
class Nav extends React.Component{
	render(){
		return (
			<div>
				<ul>
					<li><a href="/">HomePage</a></li>
					<li><a href="/#/account">Account</a></li>
					<li><a href="/#/help">Help</a></li>
					<li><a href="/#/login">Login</a></li>
				</ul>
			</div>
			)
	}
}
module.exports=Nav;