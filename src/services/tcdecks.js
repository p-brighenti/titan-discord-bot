const got = require('got');
const cheerio = require('cheerio');

exports.getTop8 = async () => {
    const response = await got(
        'https://www.tcdecks.net/format.php?format=Legacy'
    );

    const $ = await cheerio.load(response.body);

    // TODO: TEST
    const newEntries = $('b').nextAll('a');
    // .siblings

    for (let i = 0; i < newEntries.length; i++) {
        console.log('parent ', newEntries[i].parent);
        // console.log('\n\n\n');
    }
};