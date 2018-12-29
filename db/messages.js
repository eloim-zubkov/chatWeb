const Collection = require('mongodbext').Collection;
const relations = require('mongodbext-relations');

exports.create = (db) => {
	exports.collection = new Collection(db, 'messages');

	return exports.collection;
};

exports.init = (db) => {
	const collection = exports.collection;

	collection.addPlugin('sequence');
	collection.addPlugin('createDate');
	collection.addPlugin('updateDate');

	collection.addPlugin(relations, {
		relations: {
			user: {
				collection: db.users,
				projection: {_id: 1, name: 1, group: 1}
			},
			room: {
				collection: db.rooms,
				projection: {_id: 1, name: 1}
			}
		}
	});
};
