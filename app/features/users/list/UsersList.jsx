const _ = require('underscore');
const axios = require('axios');
const React = require('react');
const {List, ListItem, Search} = require('grommet');
const Room = require('./User');

module.exports = class Users extends React.Component {
	state = {users: [], total: 0, textQuery: '', isSubmiting: false};

	componentDidMount() {
		this.fetchUsers({}, {replace: true});
	}

	onSearchChange = ({target}) => {
		const textQuery = target.value;

		this.setState({textQuery});
		this.fetchUsers({textQuery}, {replace: true});
	}

	onMore = () => {
		this.fetchUsers({offset: this.state.users.length});
	}

	fetchUsers(params, {replace} = {}) {
		if (this.state.isSubmiting) {
			return;
		}

		this.setState({isSubmiting: true});

		this.requestUsers(params).then((data) => {
			this.setState(({users}) => ({
				users: replace ? data.users || [] : users.concat(data.users),
				total: data.total,
				isSubmiting: false
			}));
		});
	}

	requestUsers(params) {
		return axios.get('/api/users', {params}).then((res) => res.data);
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
						onMore={this.state.users.length !== this.state.total ? this.onMore : null}
					>
						{_(this.state.users).map((user) => (
							<ListItem key={user._id} justify="center" separator="none">
								<Room
									user={user}
								/>
							</ListItem>
						))}
					</List>
				)}
			</React.Fragment>
		);
	}
};
