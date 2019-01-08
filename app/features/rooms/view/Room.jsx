const React = require('react');
const _ = require('underscore');
const io = require('socket.io-client');
const PropTypes = require('prop-types');
const axios = require('axios');
const {
	Article, Footer, Form, Layer, List, FormField,
	Section, TextInput, PasswordInput
} = require('grommet');
const config = require('../../../../config')();

class Room extends React.Component {
	static propTypes = {
		params: PropTypes.any.isRequired
	}

	state = {
		messages: [],
		message: '',
		user: null,
		room: null,
		password: '',
		logIn: false
	};

	componentDidMount() {
		const {roomId} = this.props.params;

		axios.get(`/api/rooms/${roomId}`).then(({data: room}) => {
			this.setState({room});

			axios.get('/api/me').then(({data: user}) => {
				const socket = io(config.listen);

				socket.on('message', (username, message) => {
					if (username === 'SERVER') {
						this.handleServer(message);
					} else {
						this.addMessage(username, message);
					}
				});

				this.setState({socket, user});

				if (!room.withPassword) {
					this.initSocket();
				}
			});
		});
	}

	onChange = ({currentTarget}) => {
		this.setState({message: currentTarget.value});
	}

	onPasswordChange = ({currentTarget}) => {
		this.setState({password: currentTarget.value});
	}

	initSocket = (password = null) => {
		this.state.socket.emit(
			'init',
			this.state.user._id,
			this.state.room._id,
			password
		);
	}

	onSubmit = (event) => {
		event.preventDefault();
		if (this.state.message.length !== 0) {
			const {socket} = this.state;

			socket.emit('message', this.state.message);

			this.addMessage('Вы', this.state.message);
			this.setState({message: ''});
		}
	}

	onPasswordSubmit = (event) => {
		event.preventDefault();
		if (this.state.password.length !== 0) {
			this.initSocket(this.state.password);
		}
	}

	handleServer(message) {
		if (message !== 'Неверный пароль') {
			this.setState({
				password: '',
				logIn: true
			});

			this.addMessage('SERVER', message);
		}
	}

	addMessage(username, message) {
		this.setState(({messages}) => messages.push({username, message}));
	}

	render() {
		return (
			<Article>
				<Section wrap>
					<List size="full">
						{_(this.state.messages).map(({message, username}, index) => (
							<div key={index}>
								{`${username}: ${message}`}
							</div>
						))}
					</List>
				</Section>
				<Footer primary>
					<Form onSubmit={this.onSubmit}>
						<FormField>
							<TextInput
								id='item1'
								name='item-1'
								value={this.state.message}
								onDOMChange={this.onChange}
							/>
						</FormField>
					</Form>
				</Footer>
				{this.state.room && this.state.room.withPassword && !this.state.logIn && (
					<Layer>
						<Form onSubmit={this.onPasswordSubmit}>
							<PasswordInput
								value={this.state.password}
								onChange={this.onPasswordChange}
							/>
						</Form>
					</Layer>
				)}
			</Article>
		);
	}
}

module.exports = Room;
