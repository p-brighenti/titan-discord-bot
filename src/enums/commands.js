const prefix = process.env.BOT_PREFIX;

const COMMANDS = {
    TC_DECKS: `${prefix}tcdecks`,
    GOLDFISH: `${prefix}goldfish`,
};

Object.freeze(COMMANDS);

exports = COMMANDS;
