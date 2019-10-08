const request = require('request')

const forecast = (lat, long, callback) => {
const url = 'https://api.darksky.net/forecast/c213ddb86010ab6ab789a798997f9d49/' +lat +',' +long +'?units=si'
request({
    url, 
    json: true
}, (error, {body}) => {
    if(error){
        callback('Unable to connect to weather service',undefined)
    }else if(body.error){
        callback('Unable to find location. Try another search.', undefined)
    }else {
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees celsius out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is ' + body.currently.precipProbability + '% chance of rain.')
    }
})
}
module.exports = forecast