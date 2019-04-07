const env = require('../env');
const request = require('request')

const darkskyBaseUrl = 'https://api.darksky.net';

const forecast = (latitude, longitude, callback) => {
    const darkskyEndpoint = `${darkskyBaseUrl}/forecast/${env.apiKeys.darkskyApiKey}/${latitude},${longitude}?units=si&lang=fr`;

    request({ url: darkskyEndpoint, json: true }, (error, response, body) => {
        if (error) {
            callback('Impossible de se connecter à Weather Service!', undefined)
        } else if (body.error) {
            callback(`${printJsonValue('ERROR', body.code)}. ${body.error}`, undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} Il est ${body.currently.temperature} C dehors. Il y a  ${body.currently.precipProbability}% probabilité des averses.`);
        }
    });
}

const printJsonValue = (key, value) => `${key}: ${value}`

module.exports = forecast