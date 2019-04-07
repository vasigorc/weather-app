const env = require('../env');
const request = require('request')

const mapboxBaseUrl = 'https://api.mapbox.com';

const geocode = (address, callback) => {
    const mapboxEndpoint = `${mapboxBaseUrl}/geocoding/v5/mapbox.places/${address}.json/?access_token=${env.apiKeys.mapboxApiKey}&limit=3`;

    request({ url: mapboxEndpoint, json: true }, (error, response, body) => {
        if (error) {
            callback('Impossible de se connecter à Map Service', undefined)
        } else if (body.message) {
            callback(`Erreur de recherche: ${body.message}`, undefined)
        } else if (!body.features || !body.features.length) {
            callback("Aucun résultat pour votre requête, veuillez vérifier votre terme de recherche.", undefined)
        } else {
            callback(undefined, {latitude: body.features[0].center[1], longitude: body.features[0].center[0]})
        }
        
    });
};

module.exports = geocode