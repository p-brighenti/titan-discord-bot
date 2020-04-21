const Discord = require('discord.js');

exports.build = ({ map, config }) => {
    return new Discord.MessageEmbed()
        .setColor('#0377fc')
        .setTitle(config.title)
        .setURL(config.url)
        .setAuthor(config.author)
        .setDescription(config.description)
        .setThumbnail(config.thumbnail)
        .addFields(...transform(map))
        .setTimestamp();
};

function transform(map) {
    return map.reduce((acc, entry) => {
        acc.push({
            name: entry.title,
            value: `[link](${entry.link})`,
        });
        return acc;
    }, []);
}
