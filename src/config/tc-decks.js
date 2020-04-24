const AUTHORS = require('../enums/authors');
const DATE_FORMATS = require('../enums/date-formats');
const { formatDate } = require('../utils/date-utils');

module.exports = (() => {
    const date = new Date();
    const formattedDate = formatDate(date, DATE_FORMATS.DAY_MONTH_YEAR);
    return {
        title: `${AUTHORS.TC_DECKS} ${formattedDate}`,
        url: 'https://www.tcdecks.net/format.php?format=Legacy',
        author: AUTHORS.TC_DECKS,
        description: `New entries for ${formattedDate}`,
        thumbnail: 'https://www.tcdecks.net/img/main_Legacy.jpg',
        cronSchedule: '0 13 * * *',
    };
})();
