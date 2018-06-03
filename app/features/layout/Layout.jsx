const React = require('react');
const {
	Header, Box, Button, AddIcon, Anchor, Heading, Article
} = require('grommet');
const PropTypes = require('prop-types');
const {withRouter} = require('react-router');

function Layout({children}) {
	return (
		<Article>
			<Header
				fixed
				justify="center"
				colorIndex="grey-1-a"
				pad="small"
			>
				<Box
					justify="between"
					size="xxlarge"
					direction="row"
				>
					<Heading tag="h2" margin="none">
						<Anchor
							label="ws-Chat"
							path="/"
						/>
					</Heading>
					<Button
						label="Добавить комнату"
						primary
						icon={<AddIcon />}
						path="/add"
					/>
				</Box>
			</Header>
			<Box margin={{vertical: 'medium'}} align="center">
				<Box size="xxlarge">
					{children}
				</Box>
			</Box>
		</Article>
	);
}

Layout.propTypes = {
	children: PropTypes.element.isRequired
};

module.exports = withRouter(Layout);
