const React = require('react');
const _ = require('underscore');
const io = require('socket.io-client');
const {List} = require('grommet');
const config = require('../../../../config')();

class Room extends React.Component {
	staet = {
		messages: []
	}

	componentDidMount() {
		const socket = io(config.listen.host);

		socket.on('message', (username, message) => {
			this.setState(({messages, ...state}) => {
				messages.push({username, message});

				return {messages, ...state};
			});
		});
	}

	render() {
		return (
			<React.Fragment>
				<List>
					{_(this.state.messages).map(({message, username}, index) => (
						<div key={index}>
							{message}
							{' - '}
							{username}
						</div>
					))}
				</List>
			</React.Fragment>
		);
	}
}

module.exports = Room;
