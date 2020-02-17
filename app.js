const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './frontend')
console.log(publicDirectoryPath)

const viewsPath = path.join(__dirname, './frontend/templates/views')
const partialsPath = path.join(__dirname, './frontend/templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Book Search',
        name: 'Kevin Vo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Student Info',
        name: 'Kevin Vo'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})