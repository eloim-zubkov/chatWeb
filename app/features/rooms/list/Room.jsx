const React = require('react');
const {Image, Box, Label, Button, EditIcon, CloseIcon} = require('grommet');
const PropTypes = require('prop-types');

function Room({room}) {
	return (
		<Box
			separator="all"
			pad="small"
			size="large"
		>
			<Box align="center">
				<Label>{post.text}</Label>
			</Box>
			<Box
				direction="row"
				justify="between"
			>
				<Button
					icon={<EditIcon />}
					label="Присоединиться"
					path={`/${room._id}`}
				/>
			</Box>
		</Box>
	);
}

Room.propTypes = {
	room: PropTypes.shape({
		name: PropTypes.string.isRequired
	}).isRequired
};

module.exports = Room;
