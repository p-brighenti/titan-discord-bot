exports.config = (() => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    return {
        title: `MTG Goldfish ${formattedDate}`,
        url: 'https://www.mtggoldfish.com/',
        author: 'MTG Goldfish',
        description: `New entries for ${formattedDate}`,
        thumbnail: 'https://www.tcdecks.net/img/main_Legacy.jpg',
    };
})();
