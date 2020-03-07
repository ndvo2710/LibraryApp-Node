const log4js = require('log4js');

let defaultLevel = 'info';

console.log(`log default level is :  ${defaultLevel}`);

log4js.configure({
    levels: {info: {value: 20000, colour: 'white'}},
    appenders: {err: {type: 'stderr'}},
    categories: {default: {appenders: ['err'], level: defaultLevel}},
  });

const getLogger = log4js.getLogger;
const connectLogger = log4js.connectLogger;

module.exports = {
	getLogger, 
	connectLogger
}