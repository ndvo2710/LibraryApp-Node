const request = require('request')

const getLogger = require('../commonUtils/loggingUtil');

const logger = getLogger('forecast');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/04c7775e82fb217838949748e8f8306d/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to weather service! ${error}`, undefined)
        } else if (body.error) {
            callback(`Unable to connect to weather service! ${body.error}`, undefined)
        } else {
            callback(
				body.daily.data[0].summary + 
				' It is currently ' + 
				body.currently.temperature + 
				' degress out. This high today is ' + 
				body.daily.data[0].temperatureHigh + 
				' with a low of ' + 
				body.daily.data[0].temperatureLow + 
				'. There is a ' + 
				body.currently.precipProbability + 
				'% chance of rain.')
        }
    })
}

// module.exports = forecast

forecast(37.8267, -122.4233, (error) => {
            if (error) {
                return console.log(`Testing  ${error}`)
            }

            console.log({
                forecast: error,
                latitude: 37.8267,
				longitude: -122.4233
            })
        })
