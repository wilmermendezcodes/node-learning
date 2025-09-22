const { fetchCoordinates, getWeather } = require("./utils/geocode");
const yargs = require("yargs");

//Customize yargs version
yargs.version("1.1.0"); 


// create yargs command
yargs.command({
    command: 'AddLoc',
    describe: 'Specify location to get weather',
    builder: {
        location:{
            describe: 'Location to fetch weather for',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        const location = argv.location;
        fetchCoordinates(location, (error, data) => {
            if (error) {
                return console.log(error);
            }
            console.log(data);
            const { latitude, longitude } = data;
            getWeather(latitude, longitude, (error, weatherData) => {
                if (error) {
                    return console.log(error);
                }   
                console.log(weatherData);
            });
        });
    }
});

yargs.parse();
