const pageLoader = require('../utils/page-loader');

exports.getMostRecentLists = async () => {
    const $ = await pageLoader.load(
        'https://www.tcdecks.net/rss.php?format=Legacy'
    );

    const titles = [];
    const links = [];

    $('title')
        .contents()
        .each((i, title) => {
            titles[i] = title.data;
        });

    $('link').each((i, link) => {
        const data = link.next.data;
        links[i] = link.next.data.slice(0, data.length - 1);
    });

    return {
        config: require('../config/tc-decks'),
        data: await markNewPosts(buildResultsMap(titles, links)),
    };
};

const markNewPosts = async (map) => {
    const $ = await pageLoader.load(
        'https://www.tcdecks.net/format.php?format=Legacy'
    );

    const newEntries = [];

    $('b')
        .parent()
        .children('a')
        .each((i, elem) => newEntries.push(elem.attribs.href));

    const regexp = buildRegex(newEntries);

    return map.map((elem) =>
        !regexp.test(elem.link)
            ? elem
            : { ...elem, title: `${elem.title} (NEW)` }
    );
};

function buildRegex(linksToMatch) {
    const stringExp = linksToMatch
        .join('|')
        .replace(/\./g, '\\.')
        .replace(/\?/g, '\\?');
    return new RegExp(stringExp);
}

function buildResultsMap(titles, links) {
    // prune labels
    titles.shift();
    links.shift();

    return titles.map((title, i) => makeEntry(title, links[i]));
}

function makeEntry(title, link) {
    return {
        title,
        link,
    };
}
