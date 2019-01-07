const React = require('react');
const _ = require('underscore');
const io = require('socket.io-client');
const yup = require('yup');
const {List} = require('grommet');
const {withFormik} = require('formik');
const config = require('../../../../config')();

class Room extends React.Component {
	state = {
		messages: []
	};

	componentDidMount() {
		const socket = io(config.listen);

		socket.on('message', (username, message) => {
			this.setState(
				({messages}) => messages.push({username, message})
			);
		});
	}

	render() {
		return (
			<React.Fragment>
				<List full>
					{_(this.state.messages).map(({message, username}, index) => (
						<div key={index}>
							{`'${message}' от ${username}`}
						</div>
					))}
				</List>
			</React.Fragment>
		);
	}
}

module.exports = withFormik({
	validationSchema: yup.object().shape({
		roomName: yup
			.string()
			.required()
			.min(3)
			.max(20),
		password: yup
			.string()
			.min(6)
			.max(20)
	})
})(Room);
