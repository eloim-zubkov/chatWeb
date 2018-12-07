const _ = require('underscore');
const axios = require('axios');
const React = require('react');
const {List, ListItem, Search} = require('grommet');
const Room = require('./Room');

module.exports = class Rooms extends React.Component {
	state = {rooms: [], total: 0, textQuery: '', isSubmiting: false};

	componentDidMount() {
		this.fetchRooms({}, {replace: true});
	}

	onSearchChange = ({target}) => {
		const textQuery = target.value;

		this.setState({textQuery});
		this.fetchRooms({textQuery}, {replace: true});
	}

	onMore = () => {
		this.fetchRooms({offset: this.state.rooms.length});
	}

	fetchRooms(params, {replace} = {}) {
		if (this.state.isSubmiting) {
			return;
		}

		this.setState({isSubmiting: true});

		this.requestRooms(params).then((data) => {
			this.setState(({rooms}) => ({
				rooms: replace ? data.rooms || [] : rooms.concat(data.rooms),
				total: data.total,
				isSubmiting: false
			}));
		});
	}

	requestRooms(params) {
		return axios.get('api/rooms', {params}).then((res) => res.data);
	}

	render() {
		return (
			<React.Fragment>
				<Search
					placeHolder="Search"
					value={this.state.textQuery}
					inline
					responsive={false}
					name="textQuery"
					onDOMChange={this.onSearchChange}
				/>
				{this.state.isSubmiting ? (
					<h3>Загрузка...</h3>
				) : (
					<List
						onMore={this.state.rooms.length !== this.state.total ? this.onMore : null}
					>
						{_(this.state.rooms).map((room) => (
							<ListItem key={room._id} justify="center" separator="none">
								<Room
									room={room}
								/>
							</ListItem>
						))}
					</List>
				)}
			</React.Fragment>
		);
	}
};
