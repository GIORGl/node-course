const geocode = require("./utils/geocode");
const forecast = require("./utils/forcast");

const adress = process.argv[2];
console.log("Location:", adress);

if (!adress) {
  console.log("Please specify your locaiton!");
} else {
  geocode(adress, (error, { lat, long, location } = {}) => {
    if (error) {
      return console.log(error);
    }

    forecast(lat, long, (error, ForcastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(location);
      console.log(ForcastData);
    });
  });
}
