var request = require('request');

var framework = require('webex-node-bot-framework');
var webhook = require('webex-node-bot-framework/webhook');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(express.static('images'));

//get DNA auth token
var token = getAuthToken('devnetuser', 'Cisco123!'); // we should store token here

/*
 some code removed
*/

//Process incoming messages

// get help
framework.hears(/help, function (bot, trigger) {
  console.log(`/help command recieved`);
  
  //когда получает запрос извне, нужно выполнить http request использую полученный ранее token
});

/*
  Get DNA Center Auth Token for X-Auth-Header API requests
*/

function getAuthToken(username, password) {
  console.log("Getting DNA Center Auth Token...");

  var authString = "Basic " + new Buffer(username + ":" + password).toString("base64");

  headers = {
      "Content-Type": "application/json",
      "Authorization": authString,
      "Accept": "application/json"
  }

  body = null;

  var options = {
      method: 'POST',
      rejectUnauthorized: false,
      url: 'https://sandboxdnac.cisco.com/dna/system/api/v1/auth/token',
      headers,
      body,
  };

  request(options, function (error, response) { 
      if (error) throw new Error(error);
      getTokenResult = JSON.parse(response.body);
      console.log(getTokenResult.Token);
  });

}

/*
 start server here and listen incoming messages
*/
