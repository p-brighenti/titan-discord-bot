'use strict';

const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js');
const tcDecksService = require('./services/tc-decks');
const goldFishService = require('./services/mtg-goldfish');
const routines = require('./routines/routines');
const COMMANDS = require('./enums/commands');
const ACTIONS = require('./enums/actions');

const client = new Discord.Client();

client.on('ready', async () => {
    console.log(`Connected at ${new Date()}`);

    routines.setupDailyUpdates(client);
});

client.on('message', async (message) => {
    if (message.content === COMMANDS.TC_DECKS) {
        ACTIONS.POST_LISTS(message.channel, await tcDecksService.getNewLists());
    }

    if (message.content === COMMANDS.GOLDFISH) {
        ACTIONS.POST_LISTS(
            message.channel,
            await goldFishService.getNewLists()
        );
    }
});

client.login(process.env.BOT_TOKEN);
