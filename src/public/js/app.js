const isbnElement = document.querySelector('#isbn');
const search = document.querySelector('.search-btn');
const progressBar = document.querySelector('.progress');
const bookContent = document.querySelector('.book-content');
const cardTitle = document.querySelector('.card-title');
const authors = document.querySelector('.authors');
const publisher = document.querySelector('.publisher');
const categories = document.querySelector('.categories');
const pageCount = document.querySelector('.pageCount');
const bookSummary = document.querySelector('.book-summary');
const bookImage = document.querySelector('.book-image');
const itemList = document.querySelector('#item-list');
const borrow = document.querySelector('.borrow');
const cancel = document.querySelector('.cancel');
const totalBooksElem = document.querySelector('.total-books');
const bookUpdateElem = document.querySelector('.book-update');

let allBooks = {};
let currentBook = {};
let currentBookIndex = '';


/*
* render all books to ItemList UI
*/
(renderDataToUI)();

async function getBooks() {
	const url = '/books';
	const response = await fetch(url);
	return await response.json();
}

async function renderDataToUI() {
	itemList.innerHTML = "";
	allBooks = await getBooks();
	console.log(`Book Length is : ${allBooks.length}`);
	totalBooksElem.textContent = allBooks.length;
	allBooks.forEach(book => {
		const shortDescription = book.description.replace(/(.{500})..+/, "$1&hellip;");
		const bookImageThumbnail = book.imageLink.replace('zoom=10', 'zoom=1');
		itemList.innerHTML += `
                <li class="collection-item" id="${book._id}">
                	<div class="row">
                			<div class="col s1"></div>
							<div class="col s2">
								<a><img src="${bookImageThumbnail}" alt="image" /></a>
							</div>
							<div class="col s8">
								<strong>Book: </strong> <em>${book.title}</em>
								<br>
								<strong>Author: </strong> <em>${book.authors}</em>
								<br>
								<strong>Pages: </strong> <em>${book.pageCount}</em>
								<br>
								<strong>Description: </strong> <em>${shortDescription}</em>
								<a href="#" class="secondary-content">
									<i class="edit-item fa fa-pencil"></i>
								</a>
							</div>
					</div>
                </li>
                `
	});
}

/*
* Event Listener for ISBN Search
* Fetch Book from Libraru to Book Showcase Card Panel
 */
search.addEventListener('click', e => {
	e.preventDefault();

	if (isbnElement.value === '') {
		const div = document.createElement('div');
		div.className = 'alert';
		div.style = 'color:red';
		div.appendChild(
			document.createTextNode('ISBN is empty! Please input ISBN number.')
		);
		const container = isbnElement.parentElement;
		container.insertBefore(div, isbnElement.nextSibling);
	} else {
		const bookRouteUrl = `/goobooks?searchType=isbn&searchValue=${isbnElement.value}`;
		console.log(bookRouteUrl);
		fetch(bookRouteUrl).then((response) => {
				response.json().then((bookData) => {
					currentBook = bookData;
					updateBookContentUI(bookData);
				})
			}
		)
	}
	isbnElement.value = '';
});

const updateBookContentUI = (bookData) => {
	if (bookData.error) {
		// edge case: ISBN not found. Try with ISBN 0134319036
		if (!progressBar.classList.contains("hide")) {
			progressBar.classList.add("hide");
		}
		if (!bookContent.classList.contains("hide")) {
			bookContent.classList.add("hide");
		}
		cardTitle.innerText = '';
		authors.innerHTML = '';
		publisher.innerText = '';
		categories.innerText = '';
		pageCount.innerText = '';
		bookSummary.innerHTML = '';
		bookImage.src = '';
		const div = document.createElement('div');
		div.className = 'alert';
		div.style = 'color:red';
		div.appendChild(
			document.createTextNode(bookData.error)
		);
		const container = isbnElement.parentElement;
		container.insertBefore(div, isbnElement.nextSibling);
	} else {
		cardTitle.innerText = bookData.title;
		authors.innerText = bookData.authors;
		publisher.innerHTML = `<strong>Publisher:</strong> ${bookData.publisher}`;
		categories.innerText = bookData.categories;
		pageCount.innerText = bookData.pageCount;
		bookSummary.innerHTML = `<strong><i> ${bookData.description} </i> </strong>`;
		bookImage.src = bookData.imageLink;
		console.log(bookData);
		progressBar.classList.remove("hide");
		setTimeout(function() {
			progressBar.classList.add("hide");
			bookContent.classList.remove("hide");
		}, 1000);
	}
};


/*
* Handle click Event of Borrow Button
* Push Card panel book data to DB through API /books POST method
* Re-render data to UI
 */
cancel.addEventListener('click', e => {
	e.preventDefault();
	bookContent.classList.add("hide");
});
borrow.addEventListener('click', e => {
	e.preventDefault();
	clearAndHideBookContentUI();
	console.log('Clicking borrow');
	console.log(currentBook);
	postBook(currentBook).then(data => {
		console.log('Borrow new book');
		console.log(data);
		(renderDataToUI)();
	})
});

function clearAndHideBookContentUI(){
	cardTitle.innerText = '';
	authors.innerHTML = '';
	publisher.innerText = '';
	categories.innerText = '';
	pageCount.innerText = '';
	bookSummary.innerHTML = '';
	bookImage.src = '';
	bookContent.classList.add("hide");
}

async function postBook(bookDict) {
	const url = '/books';
	const requestConfig = {
		method: 'POST', // *GET, POST, PUT/PATCH, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *client
		body: JSON.stringify(bookDict) // body data type must match "Content-Type" header
	};
	const response = await fetch(url, requestConfig);
	return await response.json();
}


/*
* Handle click Event of edit-item button
* Update the current working book index
* Render the current working book to Update Form
 */
itemList.addEventListener('click', e => {
	e.preventDefault();
	console.log(e);
	if (e.target.classList.contains("edit-item")) {
		currentBookIndex = e.target.parentNode.parentNode.parentNode.parentNode.id;
		console.log(`Current Book Index: ${currentBookIndex}`);
		allBooks.forEach(book => {
			if (book._id === currentBookIndex) {
				currentBook = book;
				console.log('Clicking Update the book:');
				console.log(book);
				renderBookToForm(book);
			}
		});
		bookUpdateElem.classList.remove('hide');
	}
});

const updateTitle = document.querySelector('#update-title');
const updateAuthor = document.querySelector('#update-author');
const updatePageCount = document.querySelector('#update-page-count');
const updateDescription = document.querySelector('#update-description');

async function renderBookToForm(bookDict) {
	updateTitle.value = bookDict.title;
	updateAuthor.value = bookDict.authors;
	updatePageCount.value = bookDict.pageCount;
	updateDescription.value = bookDict.description;
}

/*
* Handle click Event of Update button
* Update the modifying data of current book through API /books/:id PATCH method
* Re-render all books to ItemList UI
 */
const updateButton = document.querySelector('.update-button');
updateButton.addEventListener('click', e => {
	e.preventDefault();
	bookUpdateElem.classList.add('hide');
	const updateBookDict = {};
	updateBookDict.title = updateTitle.value;
	updateBookDict.authors = updateAuthor.value;
	updateBookDict.pageCount = updatePageCount.value;
	updateBookDict.description = updateDescription.value;
	patchBook(currentBook._id, updateBookDict).then(data => {
		console.log('Update book');
		console.log(data);
		(renderDataToUI)();
	});
});

async function patchBook(id, bookDict) {
	const url = `/books/${id}`;
	const requestConfig = {
		method: 'PATCH', // *GET, POST, PUT/PATCH, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *client
		body: JSON.stringify(bookDict) // body data type must match "Content-Type" header
	};
	const response = await fetch(url, requestConfig);
	return await response.json();
}

/*
* Handle click Event of Delete button
* Update the modifying data of current book through API /books/:id DELETE method
* Re-render all books to ItemList UI
 */
const deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', e => {
	e.preventDefault();
	bookUpdateElem.classList.add('hide');
	deleteBook(currentBook._id).then(data => {
		console.log('Delete book');
		console.log(data);
		(renderDataToUI)();
	});
});

async function deleteBook(id) {
	const url = `/books/${id}`;
	const requestConfig = {
		method: 'DELETE', // *GET, POST, PUT/PATCH, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *client
	};
	const response = await fetch(url, requestConfig);
	return await response.json();
}