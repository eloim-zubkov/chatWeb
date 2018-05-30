const React = require('react');
const {Route} = require('react-router');
const Layout = require('./features/layout/Layout');
const roomsRoutes = require('./features/routes');
const Signin = require('./features/Signin');

module.exports = (
	<React.Fragment>
		<Route components={Signin} path='/signin' />
		<Route components={Layout} path='/'>
			{roomsRoutes}
		</Route>
	</React.Fragment>
);
