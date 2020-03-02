
const request = require('request')

const bookSearch = (bookName, callback) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}&orderBy=newest&maxResults=1`
	
	console.log(url)

    request({ url, json: true }, (error, { body }) => {
		if (error) {
			console.error(error)
		}
		console.log(body)
		console.info(`Title: ${body.items[0].volumeInfo.title}`)
		
    })
}


bookSearch('Harry')
