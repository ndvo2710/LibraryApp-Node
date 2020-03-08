const search = document.querySelector('.search-btn');
const progressBar = document.querySelector('.progress');
const bookContent = document.querySelector('.book-content');
const cardTitle = document.querySelector('.card-title');
const authors = document.querySelector('.authors');
const publisher = document.querySelector('.publisher');
const catgories = document.querySelector('.catgories');
const pageCount = document.querySelector('.pageCount');
const bookSummary = document.querySelector('.book-summary');


search.addEventListener('click', e => {
	e.preventDefault();

	const isbnElement = document.querySelector('#isbn');

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
		fetch(`/books?searchType=isbn&searchValue=${isbnElement.value}`).then((response) => {
				response.json().then((bookData) => {
					if (bookData.error) {
						cardTitle.innerText = bookData.error;
					} else {
						cardTitle.innerText = bookData.title;
						authors.innerHTML = bookData.authors;
						publisher.innerText = bookData.publisher;
						catgories.innerText = bookData.catgories;
						pageCount.innerText = bookData.pageCount;
						bookSummary.innerHTML = `<strong><i> ${bookData.description} </i> </strong>`;
						console.log(bookData);
						
						console.log(progressBar.classList);
						progressBar.classList.remove("hide");
						setTimeout(function() {
							progressBar.classList.add("hide");
							bookContent.classList.remove("hide");
						}, 1000);
						
					}
				})
			}
		)
	}
	
	
});