exports.config = (() => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    return {
        title: `TC Decks ${formattedDate}`,
        url: 'https://www.tcdecks.net/format.php?format=Legacy',
        author: 'TC Decks',
        description: `New entries for ${formattedDate}`,
        thumbnail: 'https://www.tcdecks.net/img/main_Legacy.jpg',
    };
})();
