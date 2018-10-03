angular.module('TweetsService', []).service('TweetsService', ['$http','$q', function($http,$q) {

    var tweetsServ = this;
    tweetsServ.getLatestTweets = getLatestTweets;
    tweetsServ.getTweetsByName = getTweetsByName;

    function getLatestTweets() {

        return $http.get('/getTweets')
            .then(successFn, errorFn);
    }


    function getTweetsByName(name){
        return $http({
            url:"getTweetsByName",
            method : "PUT",
            data: {"username" : name},
            headers: {'Content-Type': 'application/json'}
        }).then(successFn,errorFn);
    }

    function successFn(response) {
        return response.data;
    }

    function errorFn(error) {
        return $q.reject(error);
    }

}]);