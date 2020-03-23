const logging = require('../common/loggingUtil');
const logger = logging.getLogger('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const MongoDbAtlasPW = process.env.MONGODB_PASSWORD;
const MongoDbUrl = `mongodb+srv://devndvo:${MongoDbAtlasPW}@cluster0-1inco.mongodb.net/test?retryWrites=true&w=majority`;

const mongooseConnect = () => {
	try {
		mongoose.connect(MongoDbUrl, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useCreateIndex: true,
				useFindAndModify: false
				});
		logger.info('Already connected to Mongo DB Atlas');
	}
	catch(e) {
		logger.info('Failed to establish connection to Mongo DB Atlas');
		logger.debug(e);
	}
}


module.exports = mongooseConnect;


