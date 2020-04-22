const pageLoader = require('../utils/page-loader');
const { weeksPriorTo } = require('../utils/date-calculator');
const config = require('../config/goldfish');

exports.getWeekLists = async () => {
    const $ = await pageLoader.load(buildLink());

    const entries = [];

    $('td > a').each((i, link) => {
        entries.push({
            title: link.children[0].data,
            link: `https://www.mtggoldfish.com/${link.attribs.href}`,
        });
    });

    const currentYear = new Date().getFullYear();
    const regexp = new RegExp(`^(${currentYear}|${currentYear - 1})`);
    const orderedDates = $('tr')
        .text()
        .split('\n')
        .filter((str) => regexp.test(str));

    const results = entries.map((elem, i) => {
        return {
            ...elem,
            date: orderedDates[i],
        };
    });

    return {
        config,
        data: results,
    };
};

const buildLink = () => {
    const today = new Date();
    const weekAgo = weeksPriorTo(today.getTime());

    return (
        'https://www.mtggoldfish.com/tournament_searches/create?utf8=%E2%9C%93&' +
        'tournament_search%5Bname%5D=&tournament_search%5Bformat%5D=legacy&tournament_search%' +
        '5Bdate_range%5D=' +
        weekAgo.getMonth() +
        '%2F' +
        weekAgo.getDate() +
        '%2F' +
        weekAgo.getFullYear() +
        '+-+' +
        today.getMonth() +
        '%2F' +
        today.getDate() +
        '%2F' +
        today.getFullYear() +
        '&commit=Search'
    );
};
