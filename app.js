const request = require('request');
const env = require('./env');
const yargs = require('yargs');

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

//1st argument is the options body
request({
    url: 'http://www.mapquestapi.com/geocoding/v1/address?key='+env.getKey()+'&location='+encodedAddress,
    json: true //to take a JSON string and convert it into an object
}, (error, response, body) => {
    printJsonValue("City", body.results[0].locations[0].adminArea5);
    printJsonValue("Latitude", body.results[0].locations[0].latLng.lat);
    printJsonValue("Longitude", body.results[0].locations[0].latLng.lng);
});

let printJsonValue = (key, value) => {
    console.log(`${key}: ${value}`);//last argument is for the number of indentations
}