require('grommet/grommet.min.css');

const React = require('react');
const {render} = require('react-dom');
const {Router, browserHistory} = require('react-router');
const {App} = require('grommet');
const routes = require('./routes');

render(
	<App centered={false}>
		<Router history={browserHistory}>
			{routes}
		</Router>
	</App>,
	document.getElementById('app')
);
