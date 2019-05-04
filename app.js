const yargs = require('yargs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//object that stores the final parsed output
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Adresse pour recherche',
            string: true //tells yargs to always parse 'a' as a string
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const encodedAddress = encodeURIComponent(argv.a);

geocode(encodedAddress, (error, data) => {
    if (error) {
        return console.log(error)
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error) {
            return console.log(error)
        }

        console.log(`${data.location}\n
        ${forecastData}`)
    })
})