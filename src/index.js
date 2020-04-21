const Discord = require('discord.js');
const tcDecksService = require('./services/tcdecks');
const embedder = require('./utils/embedder');
const dotenv = require('dotenv');

dotenv.config();

const client = new Discord.Client();
const prefix = process.env.BOT_PREFIX;

client.on('ready', async () => {
    console.log(await tcDecksService.getRecentPostings());
});

client.on('message', async (message) => {
    if (message.content === `${prefix}tcdecks`) {
        message.channel.send(
            embedder.build(await tcDecksService.getRecentPostings())
        );
    }
});

client.login(process.env.BOT_TOKEN);
