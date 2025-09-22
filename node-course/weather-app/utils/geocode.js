const request = require("request");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  // Load the .env placed at the repo root (two levels up from this file)
  path: path.resolve(__dirname, "../../../.env"),
});

const { GEOAPIFY_URL: geoApifyURL, GEOAPIFY_KEY: geoApifyKey } = process.env;
const { WEATHERSTACK_URL: weatherStackURL, WEATHERSTACK_KEY: weatherStackKey } = process.env;

const getWeather = (latitude, longitude, callback) => {
    const url = `${weatherStackURL}?access_key=${weatherStackKey}&query=${latitude},${longitude}&units=m`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (response.body.error) {
            callback("Unable to find location", undefined);
        } else {
            const data = response.body;
            console.log(data);
            callback(undefined,
                data.current.weather_descriptions[0] +
                ". It is currently " +
                data.current.temperature +
                " degrees out. It feels like " +
                data.current.feelslike +
                " degrees out."
            );
        }   
    });
}

const fetchCoordinates = (loc, callback) => {
    const url = `${geoApifyURL}?text=${encodeURIComponent(loc)}&apiKey=${geoApifyKey}`;
    console.log(url);
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (response.body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined);
        }
        else {
            const data = response.body.features[0];
            callback(undefined, {
                latitude: data.geometry.coordinates[1],
                longitude: data.geometry.coordinates[0]
            });
        }
    });
}

module.exports = { fetchCoordinates, getWeather };
