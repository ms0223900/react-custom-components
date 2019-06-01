/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
require('dotenv').config()

var express = require('express')
var compression = require('compression')


var app = express()
var port = process.env.PORT || 3010

app.use(compression())
app.use(express.static(__dirname + '/dist'))

app.listen(port, function(err) {
  if(err) {
    console.error(err)
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})