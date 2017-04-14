module.exports = function(app) {

    app.intent("testintent", {
            "utterances": ["say the number"]
        },
        function(request, response) {
        	console.log(request)
            response.say("All hail the number 19!");
        }
    );
}
