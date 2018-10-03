module.exports = {

    'tweetsUrl': 'https://api.twitter.com/1.1/statuses/home_timeline.json?count=50',
    'tweetsByNameUrl': 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=25&screen_name=',

    /** need to update with user keys to run from local, when releasing to production need to as environment variables*/
    'consumer_key': process.env.consumer_key,
    'consumer_secret': process.env.consumer_secret,
    'access_token': process.env.access_token,
    'access_token_secret': process.env.access_token_secret
};