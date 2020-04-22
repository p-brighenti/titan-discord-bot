'use strict';

const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js');
const tcDecksService = require('./services/tcdecks');
const goldFishService = require('./services/goldfish');
const embedder = require('./utils/embedder');
const routines = require('./routines/routines');
const COMMANDS = require('./enums/commands');

const client = new Discord.Client();

client.on('ready', async () => {
    console.log(`Connected at ${new Date()}`);

    routines.setupDailyUpdates(client, 14);
});

client.on('message', async (message) => {
    if (message.content === COMMANDS.TC_DECKS) {
        message.channel.send(
            embedder.build(await tcDecksService.getMostRecentLists())
        );
    }

    if (message.content === COMMANDS.GOLDFISH) {
        message.channel.send(
            embedder.build(await goldFishService.getWeekLists())
        );
    }
});

client.login(process.env.BOT_TOKEN);
