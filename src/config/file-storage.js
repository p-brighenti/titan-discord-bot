const path = require('path');

const config = {
    basePath: path.normalize(`${__dirname}/../../.store`),
    encoding: 'utf-8',
    entryThreshold: 50,
};

module.exports = config;
