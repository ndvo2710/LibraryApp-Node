const MongoStore = require('../server/store/MongoStore');

const mongoStore = new MongoStore();

const bookId = '5e6cdb3a6cd2193cb39b3209';

// mongoStore.getAllBook().then(books => {
//     console.log(books);
// })

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
