const request = require('request');
const env = require('./env');
const yargs = require('yargs');

const mapboxBaseUrl = 'https://api.mapbox.com';
//object that stores the final parsed output
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true //tells yargs to always parse 'a' as a string
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const encodedAddress = encodeURIComponent(argv.a);

const mapboxEndpoint = `${mapboxBaseUrl}/geocoding/v5/mapbox.places/${encodedAddress}.json/?access_token=${env.apiKeys.mapboxApiKey}&limit=3`;
const darkskyEndpoint = `https://api.darksky.net/forecast/${env.apiKeys.darkskyApiKey}/45.4613528,-73.5744687?units=si&lang=fr`;

request({url: mapboxEndpoint, json: true}, (error, response, body) => {
    const latitude = body.features[0].center[1]
    const longitude = body.features[0].center[0]
    console.log(latitude, longitude);
});

request({ url: darkskyEndpoint, json: true //to take a JSON string and convert it into an object
}, (error, response, body) => {
    console.log(`${body.daily.data[0].summary} Il est ${body.currently.temperature} C dehors. Il y a  
    ${body.currently.precipProbability}% probabilité des averses.`);
});

let printJsonValue = (key, value) => {
    console.log(`${key}: ${value}`);
}