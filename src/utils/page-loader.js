const got = require('got');
const cheerio = require('cheerio');

exports.load = async (url) => {
    const response = await got(url);
    return await cheerio.load(response.body);
};
