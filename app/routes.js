var tweets = require('./tweets');
require('../config/db');
require('../config/twitter');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.sendfile('./public/index.html');
    });

    app.get('/getTweets', function (req, res) {

        tweets.getTweets(function (err, response) {
            if (err) {
                console.log("Error is " + JSON.stringify(err));
                return null;
            }
            console.log("Successfully retrieved twitter tweets " + response.length);
            res.send(response);
        });
    });

    app.put('/getTweetsByName', function (req, res) {

        tweets.getTweetsByName(req.body.username, function (err, response) {
            if (err) {
                console.error("Error is " + JSON.stringify(err));
                return null;
            }
            console.log("Successfully retrieved twitter tweets " + response.length);
            res.send(response);
        });
    });


};