const React = require('react');
const {IndexRoute} = require('react-router');
const {Route} = require('react-router');
const RoomList = require('./rooms/list/RoomList');
const Form = require('./rooms/form/Form');
const Room = require('./rooms/view/Room');

module.exports = (
	<React.Fragment>
		<IndexRoute components={RoomList} />
		<Route components={Form} path="/add" />
		<Route components={Room} path=":_id" />
	</React.Fragment>
);
