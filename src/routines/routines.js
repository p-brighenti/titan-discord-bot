const cron = require('node-cron');
const tcDecksService = require('../services/tc-decks');
const goldfishService = require('../services/mtg-goldfish');
const tcDecksConfig = require('../config/tc-decks');
const goldfishConfig = require('../config/mtg-goldfish');
const CHANNELS = require('../enums/channels');
const ACTIONS = require('../enums/actions');

exports.setupDailyUpdates = (client) => {
    const channel = client.channels.cache.get(CHANNELS.NEW_LISTS);

    const tcDecksTask = cron.schedule(tcDecksConfig.cronSchedule, async () =>
        ACTIONS.POST_LISTS(channel, await tcDecksService.getNewLists())
    );

    const goldfishTask = cron.schedule(goldfishConfig.cronSchedule, async () =>
        ACTIONS.POST_LISTS(channel, await goldfishService.getNewLists())
    );

    tcDecksTask.start();
    goldfishTask.start();
};
