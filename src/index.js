const Discord = require('discord.js');
const tcDecksService = require('./services/tcdecks');

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

const bot_secret_token =
    'NzAxODg0MjQ2MzcyOTA5MTc3.Xp3_kg.RNY5Mctf-kcNonRQ9oEfQ8T_aFI';

client.login(bot_secret_token);
