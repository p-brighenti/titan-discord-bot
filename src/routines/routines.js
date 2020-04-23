const cron = require('node-cron');
const tcDecksService = require('../services/tc-decks');
const goldfishService = require('../services/mtg-goldfish');
const embedder = require('../utils/embedder');
const CHANNELS = require('../enums/channels');

exports.setupDailyUpdates = (client, hour) => {
    const channel = client.channels.cache.get(CHANNELS.NEW_LISTS);

    const task = cron.schedule(`0 ${hour - 1} * * *`, async () => {
        await channel.send(
            embedder.build(await tcDecksService.getMostRecentLists())
        );

        await channel.send(
            embedder.build(await goldfishService.getWeekLists())
        );
    });

    task.start();
};
