const request = require("postman-request");

const geocode = (adress, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress
  )}.json?&access_token=pk.eyJ1Ijoia2ljaGlnZW9jb2RpbmciLCJhIjoiY2tuYnk5bDc4MXZ5bzJ1bnhld2xxMHZrZCJ9.U4ZT9Q3-3Z2QfeFolZVktA&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services");
    } else if (body.features.length === 0) {
      callback("Unable to find the location, try again!");
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
