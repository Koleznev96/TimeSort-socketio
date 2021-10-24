const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const sortRoute = require('./src/api/sort');

const app = express();

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/sort', sortRoute);

const server = http.createServer(app);

module.exports = server;
