angular.module('TweetsController', []).controller('TweetsController', function ($scope, TweetsService) {

    var tweetCtrl = this;
    tweetCtrl.tagline = 'Tweets';

    init($scope, TweetsService, tweetCtrl)

});

/** TweetsServ is injected to call latest Tweets and updates controller level scope with tweets data*/
function init($scope, TweetsServ, tweetCtrl) {

    TweetsServ.getLatestTweets().then(function (tweets) {
        tweetCtrl.data = tweets;
    });

    tweetCtrl.getTweetsByName = function () {

        TweetsServ.getTweetsByName(tweetCtrl.twittername).then(function (tweets) {
            tweetCtrl.data = tweets;
        })
    }
}
