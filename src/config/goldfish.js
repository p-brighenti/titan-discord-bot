const AUTHORS = require('../enums/authors');
const { weeksPriorTo } = require('../utils/date-calculator');

exports = (() => {
    const today = new Date();
    const start = weeksPriorTo(today.getTime());

    const currentDate = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
    const startDate = `${start.getDate()}/${start.getMonth()}/${start.getFullYear()}`;

    return {
        title: `${AUTHORS.GOLDFISH} ${currentDate}`,
        url: 'https://www.mtggoldfish.com/',
        author: AUTHORS.GOLDFISH,
        description: `Lists from ${startDate} to ${currentDate}`,
        thumbnail:
            'https://images1.mtggoldfish.com/uploads/ckeditor/pictures/674/content_mtggoldfish_logo.jpg',
    };
})();
