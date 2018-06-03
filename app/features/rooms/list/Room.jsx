const React = require('react');
const {Image, Box, Label, Button, AddIcon} = require('grommet');
const PropTypes = require('prop-types');

function Room({room}) {
	return (
		<Box
			separator="all"
			pad="small"
			size="large"
		>
			<Box align="center">
				<Label>{room.name}</Label>
			</Box>
			<Box
				direction="row"
				justify="center"
			>
				<Button
					icon={<AddIcon />}
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
