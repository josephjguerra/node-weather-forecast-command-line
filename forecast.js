// Problem:   I want the weather forcast!
// Solution:  Use node js to connect to wunderground api and show the weather forecast
//            Sign up for your own free wunderground developer key at https://www.wunderground.com/weather/api/

// Requires
var http     = require('http');
var apiFile  = require('./apiFile'); // apiKey in separate apiFile.js file to protect it :)

// function to print out the weather
function printWeather(zip, forecast) {
  var message = 'Your weather forcast is: ' + forecast;
  console.log(message);
};

// function to print out errors
function printError(error) {
  console.error(error.message);
};

// Connect to wunderground API
function getForecast(enteredZip) {
  var request = http.get('http://api.wunderground.com/api/' + apiFile.apiKey + '/forecast/q/' + enteredZip + '.json', function(response) {
    // console.log(response.statusCode); // for testing to see the status code
    var body = ''; // start with an empty body since node gets responses in chunks

    // Read the data
    response.on('data', function(chunk) {
      body += chunk;
    });

    response.on('end', function() {
      if ( response.statusCode === 200 ) {
        try {
          // Parse the data
          var forecast = JSON.parse(body);
          //console.dir(forecast); // for testing to see the JSON response

          // Print the data
          printWeather(enteredZip, forecast.forecast.txt_forecast.forecastday[0].fcttext);
        } catch(error) {
          // Print any errors
          printError(error);
        };

      } else {
        // Status code error
        printError({message: 'OOPS! There was a problem getting the weather! (' + response.statusCode + ')'});
      };
    });
  });

  // Print connection error
  request.on('error', printError);

// end getForecast function
};

// uncomment below if you want to run this file from the command line. ex: node forecast.js 28285
getForecast(process.argv); // process.argv lets you pass a zip in command line. ex: node forecast.js 28285

// uncomment below if you want to run this forecast  from a separate file. ex: node app.js 28285
// module.exports.getForecast = getForecast;
