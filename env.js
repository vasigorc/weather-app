const fs = require('fs');
const resourcesFile = './resources/env.json';

let getKey = () => {
    try {
        const envString = fs.readFileSync(resourcesFile);
        const envObj = JSON.parse(envString);
        return envObj.apiKey;
    } catch (error) {
        console.log(`Error: "env.json" file doesn't exist yet`);
    }
}

module.exports  = {
    getKey
}