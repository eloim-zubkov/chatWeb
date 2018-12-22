const React = require('react');
const {Route} = require('react-router');
const Layout = require('./features/layout/Layout');
const roomsRoutes = require('./features/routes');
const Signin = require('./features/Signin');
const Signup = require('./features/Signup');

module.exports = (
	<React.Fragment>
		<Route components={Signin} path='/signin' />
		<Route components={Signup} path='/signup' />
		<Route components={Layout} path='/'>
			{roomsRoutes}
		</Route>
	</React.Fragment>
);
