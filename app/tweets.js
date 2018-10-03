var express = require('express');
var Twitter = require('twit');
var log4js = require('log4js');
var logger = log4js.getLogger();

var config = require('../config/db');
const redis = require('redis');
const REDIS_PORT = config.redis.port;
const twitterConfig = require('../config/twitter');

const redisClient = redis.createClient(REDIS_PORT);

/* Get Tweets from cache 
 if data exists with cache key, data is returned
 else call Twitter Tweets API and set to cache when no data found cache
 THe cache value expires every 5 minutes so data will be refreshed every 5 minutes. */
module.exports.getTweets = function getTweets(callback) {


    var url = twitterConfig.tweetsUrl;

    var client = new Twitter({
        'consumer_key': twitterConfig.consumer_key,
        'consumer_secret': twitterConfig.consumer_secret,
        'access_token': twitterConfig.access_token,
        'access_token_secret': twitterConfig.access_token_secret
    });
    
    try {

        redisClient.get(url, function (err, data) {

            if (!err && data) {
                callback(null, data);
            }
            else {
                client.get(url, function (error, response, body) {
                    if (error) {
                        console.error("Error getting tweets data for" + JSON.stringify(error));
                        callback(error, null);
                    }
                    else {

                        redisClient.set(url, JSON.stringify(response), 'EX', 5 * 60, function (err) {
                            console.info("Cache set for " + url);
                            callback(null, response);
                        });
                    }
                });
            }
        });

    }
    catch (e) {
        console.error("Error while getting Tweets from API " + url);
        callback(e, null);
    }
};


/* Get Tweets from cache
 if data exists with cache key, data is returned
 else call Twitter Tweets API and set to cache when no data found cache
 THe cache value expires every 5 minutes so data will be refreshed every 5 minutes. */
module.exports.getTweetsByName = function getTweetsByName(twitterName,callback) {

    var url = twitterConfig.tweetsByNameUrl+twitterName ;

    var client = new Twitter({
        'consumer_key': twitterConfig.consumer_key,
        'consumer_secret': twitterConfig.consumer_secret,
        'access_token': twitterConfig.access_token,
        'access_token_secret': twitterConfig.access_token_secret
    });

    try {
                client.get(url, function (error, response, body) {
                    if (error) {
                        console.error("Error getting tweets data by name " + url);
                        callback(error, null);
                    }
                    else {

                            callback(null, JSON.stringify(response));
                    }
                });
    }
    catch (e) {
        console.error("Error while getting Tweets by name from API " + url);
        callback(e, null);
    }
};