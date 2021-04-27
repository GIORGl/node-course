const request = require("postman-request");
const API_KEY = "dd5c6baf0c9a7d08469b0ac7bc45e60a";

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=dd5c6baf0c9a7d08469b0ac7bc45e60a&query=${Math.floor(
    lat
  ).toString()},${Math.floor(long).toString()}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to forcast services");
    } else if (body.error) {
      console.log(body.error);
      callback(
        `Please specify a valid location identifier using the query parameter. ${response.body}`
      );
    } else {
      callback(
        undefined,
        `  It is currently ${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
