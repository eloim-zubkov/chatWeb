const React = require('react');
const axios = require('axios');
const {
	Article, Header, Box, Button, AddIcon, Anchor, Heading
} = require('grommet');
const PropTypes = require('prop-types');
const {withRouter} = require('react-router');

class Layout extends React.Component {
	static propTypes = {
		children: PropTypes.element.isRequired,
		router: PropTypes.any.isRequired
	};

	state = {
		user: null
	}

	componentDidMount() {
		axios.get('/api/me').then(({data}) => {
			this.setState({user: data});
		});
	}

	onExitClick = () => {
		axios.delete('/api/users').then(() => {
			this.setState({user: null});
			this.props.router.push('/signin');
		});
	}

	render() {
		return (
			<Article>
				<Header
					fixed
					colorIndex="grey-1-a"
					pad="small"
					justify="between"
					direction="row"
				>
					<Heading tag="h2" margin="none">
						<Anchor
							label="ws-Chat"
							path="/"
						/>
					</Heading>
					<Box margin="none" align="center" direction="row">
						<Box margin={{horizontal: 'small', vertical: 'none'}}>
							<Button
								label="Добавить комнату"
								primary
								icon={<AddIcon />}
								path="/add"
							/>
						</Box>
						{this.state.user && (
							<Button
								label="Выйти"
								primary
								onClick={this.onExitClick}
							/>
						)}
					</Box>
				</Header>
				{this.props.children}
			</Article>
		);
	}
}

module.exports = withRouter(Layout);
