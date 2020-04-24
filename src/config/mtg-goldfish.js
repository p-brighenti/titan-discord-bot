const AUTHORS = require('../enums/authors');
const DATE_FORMATS = require('../enums/date-formats');
const { weeksPriorTo, formatDate } = require('../utils/date-utils');

module.exports = (() => {
    const today = new Date();
    const start = weeksPriorTo(today, 1);

    const currentDate = formatDate(today, DATE_FORMATS.DAY_MONTH_YEAR);
    const startDate = formatDate(start, DATE_FORMATS.DAY_MONTH_YEAR);

    return {
        title: `${AUTHORS.GOLDFISH} ${currentDate}`,
        url: 'https://www.mtggoldfish.com/',
        author: AUTHORS.GOLDFISH,
        description: `Lists from ${startDate} to ${currentDate}`,
        thumbnail:
            'https://images1.mtggoldfish.com/uploads/ckeditor/pictures/674/content_mtggoldfish_logo.jpg',
        cronSchedule: '0 8,14,19,23 * * *',
    };
})();
