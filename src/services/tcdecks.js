const got = require('got');
const cheerio = require('cheerio');

exports.getTourneyLinks = async () => {
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

    return buildResultsMap(titles, links);
};

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
