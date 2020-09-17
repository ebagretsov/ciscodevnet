const request = require('request')

const framework = require('webex-node-bot-framework')
const webhook = require('webex-node-bot-framework/webhook')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(express.static('images'))

/*
  Get DNA Center Auth Token for X-Auth-Header API requests
*/
const getAuthToken = async (username, password) => new Promise((resolve, reject) => {
    console.log('Getting DNA Center Auth Token...')
    let authString = 'Basic ' + new Buffer(username + ':' + password).toString('base64')

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': authString,
        'Accept': 'application/json'
    }

    let body = null
    let options = {
        method: 'POST',
        rejectUnauthorized: false,
        url: 'https://sandboxdnac.cisco.com/dna/system/api/v1/auth/token',
        headers,
        body
    }

    request(options, (error, response) => {
        if (error) return reject(error)
        let responseBody = JSON.parse(response.body)
        resolve(responseBody.Token)
    })
});

(async function () {
    // теперь токен можно использовать в скопе анонимной функции
    let token = await getAuthToken('devnetuser', 'Cisco123!')
    console.log(token)

    //Process incoming messages

    // get help
    // framework.hears('/help', function (bot, trigger) {
    //     console.log(`/help command recieved`)
    //
    //     //когда получает запрос извне, нужно выполнить http request использую полученный ранее token
    // })
})()
