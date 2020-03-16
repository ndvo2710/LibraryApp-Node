// Parse data from json files in dumpData directory
// Then push to MongoDB

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const dumpJsonDirectoryPath = path.join(process.env.ROOT_DIR, './playground/dumpData')
const MongoStore = require('../server/store/MongoStore');

const mongoStore = new MongoStore();

fs.readdir(dumpJsonDirectoryPath, (err, files) => {
  files.forEach(file => {
	  const fp = path.join(dumpJsonDirectoryPath, file);
	  try {
		  const bookData = require(fp);
		  console.log(`Push book in ${fp} to MongoStore`);
		  mongoStore.saveBook(bookData);
	  } catch(e) {
		  console.log(`${file} is BROKEN`);
	  }
  });
});

