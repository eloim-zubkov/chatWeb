const React = require('react');
const {FormField, Box, Label, TextInput} = require('grommet');
const axios = require('axios');
const PropTypes = require('prop-types');

class User extends React.Component{
	static propTypes = {
		user: PropTypes.shape({
			_id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			group: PropTypes.string.isRequired
		}).isRequired
	};

	state = {
		group: null
	}

	onChange = ({currentTarget}) => {
		this.setState({group: currentTarget.value});
	}

	onSelect = (event) => {
		console.log(event);
		// axios.put(
		// 	'/api/users/changeGroup',
		// 	{
		// 		_id: this.props.user._id,
		// 		group: 
		// 	}
		// )
	}

	render() {
		const {user} = this.props;

		return (
			<Box
				separator="all"
				pad="small"
				size="large"
			>
				<Box align="center">
					<Label>{user.name}</Label>
				</Box>
				<Box
					direction="row"
					justify="center"
				>
					<FormField>
						<TextInput
							name='group'
							value={user.group || this.state.group}
							onDOMChange={this.onChange}
							onSelect={this.onSelect}
							suggestions={['admins', 'users']}
						/>
					</FormField>
				</Box>
			</Box>
		);
	}
}

module.exports = User;
