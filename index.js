var winston = require('winston');
var moment = require('moment');
var extend = require('extend');
var util = require('util');
var path = require('path');
var fs = require('fs');

var DEFAULT_CONFIG = {
    consoleLevel: 'debug',
    fileLevel: 'none',
    logDir: './logs',
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
    prefix: false
};

function createLogger(config) {
    var username = config.username;
    var filePath = path.join(config.logDir, username + '.log');

    var logOptions = {
        levels: {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3
        },
        colors: {
            debug: 'grey',
            info: 'green',
            warn: 'yellow',
            error: 'red'
        },
        transports: []
    };

    // Add transports if possible
    if(config.consoleLevel !== 'none') {
        logOptions.transports.push(new (winston.transports.Console)({
            timestamp: function() { return moment().format(config.dateFormat); },
            level: config.consoleLevel,
            colorize: true
        }));
    }

    if(config.fileLevel !== 'none') {
        if (!fs.existsSync(config.logDir)){
            fs.mkdirSync(config.logDir);
        }

        logOptions.transports.push(new (winston.transports.File)({
            filename: filePath,
            timestamp: function() { return moment().format(config.dateFormat); },
            level: config.fileLevel,
            json: false
        }));
    }

    // Create logger instance
    var logger = new (winston.Logger)({
        levels: logOptions.levels,
        colors: logOptions.colors,
        transports: logOptions.transports
    });

    // Add prefix if necessary
    if(config.prefix === true) {
        logger.addFilter(function(msg) {
            return util.format('[%s] %s', username, msg);
        });
    }

    return logger;
}

exports.name = 'winston-logger';

exports.plugin = function(VaporAPI) {
    var config = extend(true, {}, DEFAULT_CONFIG, VaporAPI.data);
    config.username = VaporAPI.getConfig().username;

    var logger = createLogger(config);

    VaporAPI.registerHandler({emitter: '*', event: 'message:debug'}, logger.debug);
    VaporAPI.registerHandler({emitter: '*', event: 'message:info'}, logger.info);
    VaporAPI.registerHandler({emitter: '*', event: 'message:warn'}, logger.warn);
    VaporAPI.registerHandler({emitter: '*', event: 'message:error'}, logger.error);
};
