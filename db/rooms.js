const Collection = require('mongodbext').Collection;
const moment = require('moment');

exports.create = (db) => {
	exports.collection = new Collection(db, 'rooms');

	return exports.collection;
};

exports.init = () => {
	const collection = exports.collection;

	collection.addPlugin('sequence');
	collection.addPlugin('createDate');
	collection.addPlugin('updateDate');

	cleanChats();

	setInterval(cleanChats, 1000 * 60 * 60);

	function cleanChats() {
		collection.deleteMany({
			$and: [
				{updateDate: {$lt: moment().subtract(1, 'days').unix()}},
				{_id: {$ne: 0}}
			]
		});
	}
};
