const env = require('../env');
const request = require('request')

const darkskyBaseUrl = 'https://api.darksky.net';

const forecast = ({ latitude, longitude }, callback) => {
    const darkskyEndpoint = `${darkskyBaseUrl}/forecast/${env.apiKeys.darkskyApiKey}/${latitude},${longitude}?units=si&lang=fr`;

    request({ url: darkskyEndpoint, json: true }, (error, response, body) => {
        const { error: errorMessage, code: httpCode, daily: today, currently: now } = body

        if (error) {
            callback('Impossible de se connecter à Weather Service!', undefined)
        } else if (errorMessage) {
            callback(`${printJsonValue('ERROR', httpCode)}. ${errorMessage}`, undefined)
        } else {
            callback(undefined, `${today.data[0].summary} Il est ${now.temperature} C dehors. Il y a  ${now.precipProbability}% probabilité des averses.`);
        }
    });
}

const printJsonValue = (key, value) => `${key}: ${value}`

module.exports = forecast