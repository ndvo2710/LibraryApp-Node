
const request = require('request')

const bookSearch = (isbn, callback) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&orderBy=newest`
	
	console.log(url)

    request({ url, json: true }, (error, { body }) => {
		if (error) {
			console.log(error)
		}
		console.log(body)
		console.info(`Title: ${body.items[0].volumeInfo.title}`)
		
    })
}


bookSearch('9780605039070')
