var forecast = require('./forecast');

// console.dir(process.argv) // for testing

forecast.getForecast(process.argv); // process.argv lets you pass a zip in command line. ex: node app.js 28285
