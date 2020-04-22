const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js');
const tcDecksService = require('./services/tcdecks');
const goldFishService = require('./services/goldfish');
const embedder = require('./utils/embedder');

const client = new Discord.Client();
const prefix = process.env.BOT_PREFIX;

client.on('ready', async () => {
    console.log(`Connected at ${new Date()}`);
});

client.on('message', async (message) => {
    if (message.content === `${prefix}tcdecks`) {
        message.channel.send(
            embedder.build(await tcDecksService.getMostRecentLists())
        );
    }

    if (message.content === `${prefix}goldfish`) {
        message.channel.send(
            embedder.build(await goldFishService.getWeekLists())
        );
    }
});

client.login(process.env.BOT_TOKEN);