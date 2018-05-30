const React = require('react');
const _ = require('underscore');
const axios = require('axios');
const {List, ListItem, Search} = require('grommet');
const Room = require('./Room');

module.exports = class Rooms extends React.Component {
	state = {rooms: [], total: 0, textQuery: '', isSubmiting: false};

	componentDidMount() {
		this.getRooms();
	}

	onSearchChange = (event) => {
		const textQuery = event.target.value;
		this.setState({textQuery});
		this.getPosts({textQuery});
	}

	onMore = () => {
		this.addPosts({offset: this.state.rooms.length});
	}

	getRooms(...args) {
		this.requestRooms(...args).then(({rooms, total}) => {
			this.setState({
				rooms: rooms || [],
				total
			});
		});
	}

	addPosts(...args) {
		if (this.state.isSubmiting) {
			return;
		}
		this.setState({isSubmiting: true});
		this.requestRooms(...args)
			.then(({rooms, total}) => {
				this.setState({
					rooms: this.state.rooms.concat(rooms),
					total
				});
				this.setState({isSubmiting: false});
			});
	}

	requestRooms(params) {
		return axios.get('api/rooms', {params}).then((res) => res.data);
	}

	render() {
		if (this.state.isSubmiting) {
			return (
				<h3>Загрузка...</h3>
			);
		}
		const roomsElements = _(this.state.rooms).map((room) => (
			<ListItem key={post._id} justify="center" separator="none">
				<Room
					room={room}
				/>
			</ListItem>
		));
		return (
			<React.Fragment>
				<Search
					placeHolder="Search"
					inline
					responsive={false}
					name="textQuery"
					onDOMChange={this.onSearchChange}
				/>
				<List
					onMore={this.state.rooms.length !== this.state.total ? this.onMore : null}
				>
					{roomsElements}
				</List>
			</React.Fragment>
		);
	}
};
