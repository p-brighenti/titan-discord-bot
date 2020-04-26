const pageLoader = require('../utils/page-loader');
const { weeksPriorTo } = require('../utils/date-utils');
const storage = require('../storage/file-storage');
const AUTHORS = require('../enums/authors');

exports.getNewLists = async () => {
    const $ = await pageLoader.load(buildLink());

    console.log('generated Link \n\n', buildLink());

    const entries = [];

    $('td > a').each((i, link) => {
        entries.push({
            title: link.children[0].data,
            link: `https://www.mtggoldfish.com${link.attribs.href}`,
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

    const newLists = await storage.filterNew(AUTHORS.GOLDFISH, results);

    console.log(`${newLists.length} new goldfish results @ ${new Date()}`);

    await updateStore(newLists);

    return {
        config: require('../config/mtg-goldfish'),
        data: newLists,
    };
};

const buildLink = () => {
    const today = new Date();
    const weekAgo = weeksPriorTo(today, 1);

    return (
        'https://www.mtggoldfish.com/tournament_searches/create?utf8=%E2%9C%93&' +
        'tournament_search%5Bname%5D=&tournament_search%5Bformat%5D=legacy&tournament_search%' +
        '5Bdate_range%5D=' +
        (weekAgo.getMonth() + 1) +
        '%2F' +
        weekAgo.getDate() +
        '%2F' +
        weekAgo.getFullYear() +
        '+-+' +
        (today.getMonth() + 1) +
        '%2F' +
        today.getDate() +
        '%2F' +
        today.getFullYear() +
        '&commit=Search'
    );
};

async function updateStore(newLists) {
    if (!newLists.length) return;

    const date = new Date();
    const records = newLists.map((entry) => {
        return { link: entry.link, date };
    });

    await storage.append(AUTHORS.GOLDFISH, records);
    console.log(`${date} ${AUTHORS.GOLDFISH} ${records.length}`);
}
