const log4js = require('log4js');

let defaultLevel = 'warn';

log4js.configure({
    levels: {info: {value: 20000, colour: 'white'}},
    appenders: {err: {type: 'stderr'}},
    categories: {default: {appenders: ['err'], level: defaultLevel}},
  });

const getLogger = log4js.getLogger;

module.exports = getLogger;