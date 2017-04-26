var request = require("request");
var REST_DB_APIKEY = '85d572967adac78254a7f9cb0b42003caaf3b';

module.exports = function(app) {

    app.intent("visionintent", {
            "utterances": ["What is there in front of me"]
        },
        function(req, res) {
            var options = {
                method: 'GET',
                url: 'https://alexaskill-c6ca.restdb.io/rest/visionapi/',
                headers: {
                    'cache-control': 'no-cache',
                    'x-apikey': REST_DB_APIKEY,
                    'content-type': 'application/json'
                },
                json: true
            };

            request(options, function(error, response, body) {
                if (error) throw new Error(error);

                res.say(body.message);
            });
        }
    );
}
