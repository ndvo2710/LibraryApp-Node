
const request = require('request')

const bookSearch = (bookName, callback) => {
    const url = `https://www.googleapis.com/books/v1/volumes?a=${bookName}&orderBy=newest&maxResults=1`
	
	console.log(url)

    request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to find error', undefined)
		}
		console.log(body)
		// console.info(`Title: ${body.items[0].volumeInfo.title}`)
		// callback(undefined, 'TestingcallbackContent')
    })
}


bookSearch('Harry', (error, callbackContent) => {
	if (error) {
		return console.log(`Error is ${error}`)
	}
	console.log(`callbackContent is ${callbackContent}`);
})
