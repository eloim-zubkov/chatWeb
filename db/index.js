const _ = require('underscore');
const {MongoClient} = require('mongodb');
const config = require('../config')();

const collections = ['users', 'rooms'];

let initialized = false;

const db = module.exports = {};

db.collections = {};

db.init = async () => {
	if (initialized) {
		return;
	}

	db._client = await MongoClient.connect(config.mongodb.url);

	_(collections).each((name) => {
		const collection = require(`./${name}`);

		db[name] = db.collections[name] = collection.create(db._client);
	});

	_(collections).each((name) => {
		const collection = require(`./${name}`);

		if (collection.init) {
			collection.init(db);
		}
	});

	initialized = true;
};
