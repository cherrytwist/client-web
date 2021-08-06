
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
            'body': '{"operationName":"challengeProfile","variables":{"ecoverseId":"' + ecoverse + '", "challengeId":"' + challenge + '"},"query":"query challengeProfile($ecoverseId: UUID_NAMEID!, $challengeId: UUID_NAMEID!) {\\n  ecoverse(ID: $ecoverseId) {\\n    id\\n    challenge(ID: $challengeId) {\\n      id\\n      nameID\\n      displayName\\n      context { tagline } leadOrganisations {\\n        id\\n        displayName\\n      }\\n    }\\n  }\\n}\\n"}',
            'method': 'POST',
            'mode': 'cors'
        });

        const detailsJson = await details.json();

        console.log('Details %j', detailsJson);

        const challengeTitle = detailsJson.data.ecoverse.challenge.displayName;
        const tagline = detailsJson.data.ecoverse.challenge.context.tagline;

        const orgTemplate = {
            "id": "FWs54XdBi9LhxSLpKRHde",
            "type": "text",
            "x": 296,
            "y": 285,
            "width": 200,
            "height": 36,
            "angle": 0,
            "strokeColor": "#000000",
            "backgroundColor": "transparent",
            "fillStyle": "hachure",
            "strokeWidth": 1,
            "strokeStyle": "solid",
            "roughness": 1,
            "opacity": 100,
            "groupIds": [],
            "strokeSharpness": "sharp",
            "seed": 529843320,
            "version": 8,
            "versionNonce": 1052695560,
            "isDeleted": false,
            "boundElementIds": null,
            "text": "Test",
            "fontSize": 28,
            "fontFamily": 1,
            "textAlign": "left",
            "verticalAlign": "top",
            "baseline": 25
          }

        const orgs = detailsJson.data.ecoverse.challenge.leadOrganisations.map(org => org.displayName);

        const orgTexts = orgs.map((org, i) => {
            const orgText = {...orgTemplate}
            orgText.y += i*50;
            orgText.text = org;
            return orgText;
        })

        const excalidrawJson = {
            'type': 'excalidraw',
            'version': 2,
            'source': 'https://excalidraw.com',
            'elements': [
                {
                    'id': 'ieI2jSZR9SyHJTtKcz554',
                    'type': 'text',
                    'x': 718,
                    'y': 134.5,
                    'width': 1000,
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
                },
                {
                    'id': 'ieI2jSZR9SyHJTtKcz555',
                    'type': 'text',
                    'x': 718,
                    'y': 204.5,
                    'width': 1000,
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
                    'text': tagline,
                    'fontSize': 40,
                    'fontFamily': 1,
                    'textAlign': 'left',
                    'verticalAlign': 'top',
                    'baseline': 61
                },
                ...orgTexts
            ],
            'appState': {
                'gridSize': null,
                'viewBackgroundColor': '#ffffff'
            }
        };

        console.log(excalidrawJson)
        res.json(excalidrawJson);
    }
    else {
        next()
    }

}

module.exports = function (app) {
    app.use(cors());
    app.use(excalidraw)

};