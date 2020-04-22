const cron = require('node-cron');
const tcDecksService = require('../services/tcdecks');
const goldfishService = require('../services/goldfish');
const embedder = require('../utils/embedder');
const CHANNELS = require('../enums/channels');

exports.setupDailyUpdates = (client, hour) => {
    const channel = client.channels.cache.get(CHANNELS.NEW_LISTS);

    const task = cron.schedule(`* ${hour - 1} * * *`, async () => {
        await channel.send(
            embedder.build(await tcDecksService.getMostRecentLists())
        );

        await channel.send(
            embedder.build(await goldfishService.getWeekLists())
        );
    });

    task.start();
};
