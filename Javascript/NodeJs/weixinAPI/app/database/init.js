const mongoose = require('mongoose');
const glob = require('glob');
const { resolve } = require('path');

mongoose.Promise = global.Promise;

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require);
}

exports.connect = db => {
    let maxConnectTimes = 0;
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    return new Promise((resolve) => {
        mongoose.connect(db);
        mongoose.connection.on('disconnect', () => {
            maxConnectTimes++;
            console.log('数据库挂了');

            if (maxConnectTimes < 5) {
                mongoose.connect(db);
            } else {
                console.log('err');
            }
        });
        mongoose.connection.on('error', err => {
            console.log(err);
            maxConnectTimes++;
            console.log('数据库挂了');

            if (maxConnectTimes < 5) {
                mongoose.connect(db);
            } else {
                console.log('err');
            }
        });
        mongoose.connection.on('open', () => {
            resolve();
            console.log('mongodb connect');
        });
    });
}