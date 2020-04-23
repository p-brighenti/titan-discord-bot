const path = require('path');

const config = {
    basePath: path.normalize(`${__dirname}/../../.store`),
    encoding: 'utf-8',
};

Object.freeze(config);

module.exports = config;
