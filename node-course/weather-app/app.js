const request = require("request");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  // Load the .env placed at the repo root (two levels up from this file)
  path: path.resolve(__dirname, "../../.env"),
});
console.log(process.env.GEOAPIFY_KEY);

const { GEOAPIFY_URL: geoApifyURL, GEOAPIFY_KEY: geoApifyKey } = process.env;
const { WEATHERSTACK_URL: weatherStackURL, WEATHERSTACK_KEY: weatherStackKey } = process.env;

(async () => {
    const { latitude, longitude } = await fetchCoordinates("Felisa, Bacolod");
    const url = `${weatherStackURL}?access_key=${weatherStackKey}&query=${latitude},${longitude}&units=m`;
    request({ url: url, json: true }, (error, response) => {
        console.log(url);
        if (error) {
            console.log("Unable to connect to weather service!");
        } else if (response.body.error) {
            console.log("Unable to find location");
        } else {
            const data = response.body;
            console.log(data);
            //console.log(data.current);
            console.log(
                data.current.weather_descriptions[0] +
                ". It is currently " +
                data.current.temperature +
                " degrees out. It feels like " +
                data.current.feelslike +
                " degrees out."
            );
        }
    });
})();


function fetchCoordinates(loc) {
    const url = `${geoApifyURL}?text=${encodeURIComponent(loc)}&apiKey=${geoApifyKey}`;
    console.log(url);
    return new Promise((resolve, reject) => {
        request({ url: url, json: true }, (error, response) => {
            if (error) {
                reject("Unable to connect to location services!");
            } else if (response.body.features.length === 0) {
                reject("Unable to find location. Try another search.");
            } else {
                const data = response.body.features[0];
                resolve({
                    latitude: data.geometry.coordinates[1],
                    longitude: data.geometry.coordinates[0]
                });
            }
        });
    });
}
