const React = require('react');
const _ = require('underscore');
const axios = require('axios');
const io = require('socket.io-client');
const yup = require('yup');
const {List, ListItem, Search} = require('grommet');
const {withFormik} = require('formik');
const config = require('../../../../config')();

class Room extends React.Component {
	state = {name: '', id: null, isPassword: null, isSubmiting: false, room: ''};

	async componentWillMount() {
		const res = await this.getInformation();
		const socket = io(config.listen.host);
		const userName = await axios.get('/api/name').then((res) => {
			return res.data
		});

		this.setState({...res, socket, name, room: res.name});
		console.log(this.state);
	}

	init() {
		socket.on('message', (username, message) => {
			addMessage(username, message);
		});
	}

	getInformation() {
		const res = axios.get(`api/rooms/${this.props.params._id}`).then(
			(res) => {
				return res.data;
			}
		);

		return res;
	}

	render() {
		return (
			<React.Fragment>
				<List
				>

				</List>
			</React.Fragment>
		);
	}
};

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
			.max(20),
	}),

	handleSubmit: ({password}, {props, setSubmitting}) => {
		const roomName = this.state.room;

		axios.post(`/api/rooms`, {name: roomName, password}).then(() => {
			props.router.push(`/`);
		}).catch(() => {
			setSubmitting(false);
		});
	}
})(Room);
