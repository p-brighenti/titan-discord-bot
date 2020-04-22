const AUTHORS = require('../enums/authors');

exports = (() => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    return {
        title: `${AUTHORS.TC_DECKS} ${formattedDate}`,
        url: 'https://www.tcdecks.net/format.php?format=Legacy',
        author: AUTHORS.TC_DECKS,
        description: `New entries for ${formattedDate}`,
        thumbnail: 'https://www.tcdecks.net/img/main_Legacy.jpg',
    };
})();
