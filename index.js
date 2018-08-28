'use strict';

var express = require('express');
var kraken = require('kraken-js');
const winston = require('./lib/logger.js');
var options, app;

options = {
  onconfig: function (config, next) {
    var middleware = config.get('middleware');
    middleware.appsec.module.arguments[0].csrf = false;
    config.set('middleware', middleware);
    next(null, config);
  }
};

app = module.exports = express();
app.use(kraken(options));
app.on('start', function () {
  winston.info('Application ready to serve requests.');
  winston.info(`Environment: ${app.kraken.get('env:env')}`);
});
