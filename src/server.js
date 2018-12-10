const db = require('./db.js');

const express = require('express');
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  var selector = {
    lat: { $lt: parseFloat(req.query.topLeftLat), $gt: parseFloat(req.query.bottomRightLat) },
    long: { $lt: parseFloat(req.query.topLeftLong), $gt: parseFloat(req.query.bottomRightLong) }
  };

  var price = {};
  if (req.query.minPrice) {
    price.$gte = parseInt(req.query.minPrice);
  }

  if (req.query.maxPrice) {
    price.$lte = parseInt(req.query.maxPrice);
  }

  if (price.$lte || price.$gte) {
    selector.price = price;
  }

  console.log(price);
  console.log(selector);

  db.find('waterparks', selector, function (data) {
    res.send(JSON.stringify({
      waterparks: data
    }));
  });
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

//creating web service with url /yelp
app.get('/yelp', (req, res) => {
  const yelp = require('yelp-fusion');
  const client = yelp.client("90JMYEh0jFzPXg0PMUtGoRUaaLMSEFzFN3dlz2TguPa__7eowGy5IcG7TY8z1vdD4Z6T34s0fbNSUULP3r4J8AbClXIwDLsg_xVA6d_4IDxHtZYKM3dBGPlRHNMEXHYx");
  client.business(req.query.business).then(response => {
    console.log(response.jsonBody.name);
    res.send(JSON.stringify(response.jsonBody))
  }).catch(e => {
    console.log(e);
  });
})