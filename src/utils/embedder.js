const Discord = require('discord.js');
const { AUTHORS } = require('../enums/authors');

const embedders = {
    [AUTHORS.TC_DECKS]: tcDecksEmbed,
    [AUTHORS.GOLD_FISH]: goldFishEmbed,
};

exports.build = ({ data, config }) => {
    return new Discord.MessageEmbed()
        .setColor('#0377fc')
        .setTitle(config.title)
        .setURL(config.url)
        .setAuthor(config.author)
        .setDescription(config.description)
        .setThumbnail(config.thumbnail)
        .addFields(...embedders[config.author](data))
        .setTimestamp();
};

function tcDecksEmbed(data) {
    return data.reduce((acc, entry) => {
        acc.push({
            name: entry.title,
            value: `[link](${entry.link})`,
        });
        return acc;
    }, []);
}

function goldFishEmbed(data) {
    return data.reduce((acc, entry) => {
        acc.push({
            name: entry.date,
            value: `[${entry.title}](${entry.link})`,
        });
        return acc;
    }, []);
}
