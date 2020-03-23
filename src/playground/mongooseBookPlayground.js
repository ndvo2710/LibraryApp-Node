// const fs = require('fs');
// const path = require('path');
// const dotenv = require('dotenv');
// dotenv.config();
// const JsonFp = path.join(process.env.ROOT_DIR, './playground/dumpData/allBook.json');

const MongoStore = require('../store/MongoStore');

const mongoStore = new MongoStore();

const bookId = '5e6cdb3a6cd2193cb39b3209';

// async function hello() {
//     const abc = await mongoStore.getAllBook();
//     console.log(abc);
// }








// mongoStore.getAllBook().then(books => {
//     console.log(books);
//     // fs.writeFile(JsonFp, books,  (err) => {
//     //     if (err) throw err;
//     //     console.log('The file has been saved!');
//     // });
// });

// mongoStore.getBookById(bookId).then(book => {
//     console.log(book);
// })

// mongoStore.updateAuthorById(bookId, 234);
// mongoStore.updateTitleById(bookId, 'Hello World');
// mongoStore.updateDescriptionById(bookId, 'a very short description');

// mongoStore.updateBookById(bookId, {
//     title: 'Black Swan',
//     authors: 'Nassim Taleb',
//     publisher: 'House of Random',
//     categories: 'Risk Management',
//     pageCount: 200,
//     description: 'my very short description of this book',
// })

// mongoStore.deleteBookById(bookId);

// mongoStore.getBookById(bookId);

