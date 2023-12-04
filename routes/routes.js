const express = require('express')
const app = express()

const API_VERSION = 'v1'

app.use(`/${API_VERSION}/tracks`, require('./tracks'))

module.exports = app
