const Discord = require('discord.js');
const AUTHORS = require('../enums/authors');

const embeders = {
    [AUTHORS.TC_DECKS]: tcDecksEmbed,
    [AUTHORS.GOLDFISH]: goldFishEmbed,
};

exports.build = ({ data, config }) => {
    return new Discord.MessageEmbed()
        .setColor('#0377fc')
        .setTitle(config.title)
        .setURL(config.url)
        .setAuthor(config.author)
        .setDescription(config.description)
        .setThumbnail(config.thumbnail)
        .addFields(...embeders[config.author](data))
        .setTimestamp();
};

function tcDecksEmbed(data) {
    return data.map((entry) => {
        return {
            name: entry.title,
            value: `[link](${entry.link})`,
        };
    });
}

function goldFishEmbed(data) {
    return data.map((entry) => {
        return {
            name: entry.date,
            value: `[${entry.title}](${entry.link})`,
        };
    });
}
