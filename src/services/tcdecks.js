const got = require('got');
const cheerio = require('cheerio');
const { config } = require('../config/tcdecks');

exports.getRecentPostings = async () => {
    const response = await got('https://www.tcdecks.net/rss.php?format=Legacy');

    const $ = await cheerio.load(response.body);

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
        config,
        map: await markNewPosts(buildResultsMap(titles, links)),
    };
};

const markNewPosts = async (map) => {
    const response = await got(
        'https://www.tcdecks.net/format.php?format=Legacy'
    );

    const $ = await cheerio.load(response.body);

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

// exports.getNewPostings = async () => {};

function buildRegex(linksToMatch) {
    const stringExp = linksToMatch
        .join('|')
        .replace(/\./g, '\\.')
        .replace(/\?/g, '\\?');
    console.log(stringExp);
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
