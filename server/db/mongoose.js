const logging = require('../../commonUtils/loggingUtil');
const logger = logging.getLogger('mongoose');
const mongoose = require('mongoose');

const MongoDbAtlasPW = process.env.MONGODB_PASSWORD;
const MongoDbUrl = `mongodb+srv://devndvo:${MongoDbAtlasPW}@cluster0-1inco.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(MongoDbUrl, {
	useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
	logger.info('Connected to MongoDB Atlas (Cloud DB)!');
}).catch(err => {
	logger.error(`ERROR: ${err.message}`);
});