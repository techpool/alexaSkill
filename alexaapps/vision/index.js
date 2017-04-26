var request = require("request");
var rp = require('request-promise');
const REST_DB_APIKEY = '85d572967adac78254a7f9cb0b42003caaf3b';
const REST_DB_URL = 'https://alexaskill-c6ca.restdb.io/rest/';

module.exports = function(app) {

    app.intent("visionintent", {
            "utterances": ["What is there in front of me"]
        },
        function(req, res) {
            var options = {
                method: 'GET',
                url: REST_DB_URL + 'visionapi',
                headers: {
                    'cache-control': 'no-cache',
                    'x-apikey': REST_DB_APIKEY,
                    'content-type': 'application/json'
                },
                json: true
            };

            return new Promise(function(resolve, reject) {
                request(options, function(error, response, body) {
                    if (error) throw error;

                    if (body.length == 0) {
                        res.say('Nothing has been captured by the camera yet');
                        resolve();
                    } else {
                        res.say(body[0].message);
                        resolve();
                    }
                });
            });
        }
    );
}
