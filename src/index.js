const Discord = require('discord.js');
const tcDecksService = require('./services/tcdecks');
const dotenv = require('dotenv');

dotenv.config();

const client = new Discord.Client();

client.on('ready', async () => {
    console.log('Connected as ' + client.user.tag);
    client.guilds.cache.forEach((guild) => {
        console.log(guild.name);

        // console.log(Object.keys(guild));

        /* const testChannel = guild.channels.cache.find(
            (channel) => channel.name === 'bot-tests'
        );

        testChannel.send('Bot message test');*/
    });
    await tcDecksService.getTop8();
});

client.login(process.env.BOT_TOKEN);