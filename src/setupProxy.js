
const cors = require('cors');
const fetch = require('node-fetch');


const excalidraw = async (req, res, next) => {
    if (req.originalUrl.indexOf('excalidraw') != -1) {
        const split = req.originalUrl.split('/');
        const challenge = split.pop();
        const ecoverse = split.pop();

        const details = await fetch('http://localhost:3000/graphql', {
            'credentials': 'include',
            'headers': {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.5',
                'content-type': 'application/json',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache'
            },
            'body': '{"operationName":"challengeProfile","variables":{"ecoverseId":"' + ecoverse + '", "challengeId":"' + challenge + '"},"query":"query challengeProfile($ecoverseId: UUID_NAMEID!, $challengeId: UUID_NAMEID!) {\\n  ecoverse(ID: $ecoverseId) {\\n    id\\n    challenge(ID: $challengeId) {\\n      id\\n      nameID\\n      displayName\\n      leadOrganisations {\\n        id\\n        displayName\\n      }\\n    }\\n  }\\n}\\n"}',
            'method': 'POST',
            'mode': 'cors'
        });

        const detailsJson = await details.json();

        console.log('Details %j', detailsJson);

        const challengeTitle = detailsJson.data.ecoverse.challenge.displayName;

        res.json({
            'type': 'excalidraw',
            'version': 2,
            'source': 'https://excalidraw.com',
            'elements': [
                {
                    'id': 'ieI2jSZR9SyHJTtKcz554',
                    'type': 'text',
                    'x': 718,
                    'y': 134.5,
                    'width': 489.5384615384616,
                    'height': 86,
                    'angle': 0,
                    'strokeColor': '#000000',
                    'backgroundColor': 'transparent',
                    'fillStyle': 'hachure',
                    'strokeWidth': 1,
                    'strokeStyle': 'solid',
                    'roughness': 1,
                    'opacity': 100,
                    'groupIds': [],
                    'strokeSharpness': 'sharp',
                    'seed': 66461089,
                    'version': 138,
                    'versionNonce': 1390940591,
                    'isDeleted': false,
                    'boundElementIds': null,
                    'text': challengeTitle,
                    'fontSize': 66.1538461538462,
                    'fontFamily': 1,
                    'textAlign': 'left',
                    'verticalAlign': 'top',
                    'baseline': 61
                }
            ],
            'appState': {
                'gridSize': null,
                'viewBackgroundColor': '#ffffff'
            }
        });
    }
    else {
        next()
    }

}

module.exports = function (app) {
    app.use(cors());
    app.use(excalidraw)

};