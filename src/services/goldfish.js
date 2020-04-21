const pageLoader = require('../utils/page-loader');
const { config } = require('../config/goldfish');

exports.getWeekLists = async () => {
    // const $ = await pageLoader.load();

    const titles = [];
    const links = [];

    // $();
    console.log(buildLink());
};

const buildLink = () => {
    const dayInMilliseconds = 86400000;
    const today = new Date();
    const weekAgo = new Date(today - dayInMilliseconds * 7);

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
