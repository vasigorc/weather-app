const env = require('../env');
const request = require('request')

const mapboxBaseUrl = 'https://api.mapbox.com';

const geocode = (address, callback) => {
    const mapboxEndpoint = `${mapboxBaseUrl}/geocoding/v5/mapbox.places/${address}.json/?access_token=${env.apiKeys.mapboxApiKey}&limit=3`;

    request({ url: mapboxEndpoint, json: true }, (error, response, body) => {
        const { message: errorMessage, features: results } = body

        if (error) {
            callback('Impossible de se connecter à Map Service', undefined)
        } else if (errorMessage) {
            callback(`Erreur de recherche: ${errorMessage}`, undefined)
        } else if (!results || !results.length) {
            callback("Aucun résultat pour votre requête, veuillez vérifier votre terme de recherche.", undefined)
        } else {
            callback(undefined, {
                latitude: results[0].center[1],
                longitude: results[0].center[0],
                location: results[0].place_name
            })
        }

    });
};

module.exports = geocode