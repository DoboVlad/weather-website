const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=da9be37c9037fb879dabc2e239fc895e&query=' + latitude +
    "," + longitude + '&units=m';
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback("Unable to connect to service");
        } else if (body.error){
            callback("Unable to find location. Please try again")
        }else {
            callback(undefined, "Temperature is :" + body.current.temperature);
        }
    });
};

module.exports = forecast;