const mongoose = require('mongoose');
const bluebird = require('bluebird');
const constants = absoluteRequire('modules/constants');
const logger = absoluteRequire('modules/winston');

module.exports = () => {
	const URI = `mongodb://${constants.MONGOOSE.HOST}:${constants.MONGOOSE.PORT}/${constants.MONGOOSE.DB}`;

	const MONGOOSE_OPTIONS = {
		useNewUrlParser: true,
		auto_reconnect: true
	};

	console.log('process.env.OPENSHIFT_APP_NAME')
	console.log(process.env.OPENSHIFT_APP_NAME)

	console.log('process.env.OPENSHIFT_MONGODB_DB_URL')
	console.log(process.env.OPENSHIFT_MONGODB_DB_URL)

	console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
	console.log(URI)
	console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

	mongoose.Promise = bluebird;
	mongoose.connect(URI, MONGOOSE_OPTIONS);

	mongoose.connection.on('connected', () => {
		logger.info('Mongoose: Started');
	});

	mongoose.connection.on('reconnecting', () => {
		logger.info('Mongoose: Reconnecting');
	});

	mongoose.connection.on('open', () => {
		logger.info('Mongoose: Connection is open');
	});

	mongoose.connection.on('disconnected', () => {
		logger.warn('Mongoose: Disconnected');
	});

	mongoose.connection.on('error', (error) => {
		logger.error(`Mongoose: Erro. ${error}`);
	});
};