'use strict';

require('dotenv').config();
const app = require('./index');
const http = require('http');
const winston = require('./lib/logger.js');
var server;

server = http.createServer(app);
server.listen(process.env.PORT || 8000);
server.on('listening', function () {
  winston.info(`Server listening on http://localhost: ${this.address().port}`);
});
