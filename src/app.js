const express = require('express')
const request = require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const hbs = require('hbs')
const publicPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')
app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', 'hbs')
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)
app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Meet Parikh'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Meet Parikh'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide valid location!'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location} = { }) =>{
        if(error){
            return res.send({error})
            }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Meet Parikh'
    })
})
app.get('/help/*', (req,res) => {
    res.render('pattern',{
        title: '404',
        name: 'Meet Parikh',
        errorMessage: 'Help article not found.'
    })
})
app.get('*', (req,res) => {
    res.render('pattern',{
        title: '404',
        name: 'Meet Parikh', 
        errorMessage: 'Page not found.'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' +port)
})