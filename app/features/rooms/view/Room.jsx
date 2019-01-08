const React = require('react');
const _ = require('underscore');
const io = require('socket.io-client');
const yup = require('yup');
const {Box, List, FormField, TextInput} = require('grommet');
const {withFormik} = require('formik');
const config = require('../../../../config')();

class Room extends React.Component {
	state = {
		messages: [],
		text: ''
	};

	componentDidMount() {
		const socket = io(config.listen);

		socket.on('message', (username, message) => {
			this.setState(
				({messages}) => messages.push({username, message})
			);
		});
	}

	onChange = ({currentTarget}) => {
		this.setState({text: currentTarget.value});
	}

	render() {
		return (
			<Box full>
				<List full>
					{_(this.state.messages).map(({message, username}, index) => (
						<div key={index}>
							{`'${message}' от ${username}`}
						</div>
					))}
				</List>
				<FormField>
					<TextInput
						id='item1'
						name='item-1'
						value={this.state.text}
						onDOMChange={this.onChange}
					/>
				</FormField>
			</Box>
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
