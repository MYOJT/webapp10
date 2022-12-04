let log4js = require('log4js');

//config
log4js.configure({
    appenders: {
        system: {type: 'file', filename: 'logs/system.log'},
        access: {type: 'file', filename: 'logs/access.log'} //追加
    },
    categories: {
        default: {appenders:['system'], level: 'debug'},
        web: {appenders: ['access'], level: 'info'} //追加
    }
});

//logger
let systemLogger = log4js.getLogger();
let accessLogger = log4js.getLogger('web'); //追加

module.exports.log4js = log4js;
module.exports.systemLogger = systemLogger;
module.exports.accessLogger = accessLogger;