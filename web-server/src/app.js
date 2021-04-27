const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forcast");
const request = require("postman-request");
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
  });
});

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home page",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No location found! Plaease specify your location",
    });
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });

  // res.render("weather", {
  //   title: "Weather forecast",
  //   forecast: "It is raining",
  //   location: "tbilisi",
  // });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 page",
    errorMassage: "No help article found! Try again!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    errorMassage: "No page found",
  });
});
app.listen(3000, () => {
  console.log("server is up on port 3000!");
});
