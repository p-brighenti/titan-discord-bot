const pageLoader = require('../utils/page-loader');
const baseUrl = 'https://www.tcdecks.net';

exports.getNewLists = async () => {
    const $ = await pageLoader.load(
        'https://www.tcdecks.net/format.php?format=Legacy'
    );

    const entries = [];

    $('b')
        .parent()
        .children('a')
        .each((i, elem) =>
            entries.push({
                title: elem.firstChild.data,
                link: `${baseUrl}/${elem.attribs.href}`,
            })
        );

    return {
        config: require('../config/tc-decks'),
        data: entries,
    };
};
