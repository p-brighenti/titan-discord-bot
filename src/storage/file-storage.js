const fs = require('fs').promises;
const config = require('../config/file-storage');
const { emitter, EVENTS } = require('../emitters/file-storage');
const { weeksPriorTo } = require('../utils/date-utils');
const AUTHORS = require('../enums/authors');
const JSONL = require('../utils/jsonl');

exports.read = async (author) => {
    const data = JSONL.parse(
        await fs.readFile(getPath(author), config.encoding)
    );

    if (data.length > config.entryThreshold) {
        emitter.emit(EVENTS.THRESHOLD_REACHED, { author, data });
    }

    return JSONL.parse(data);
};

exports.append = async (author, data) => {
    if (!isValidAuthor(author)) {
        console.error(`abort read: invalid author ${author}`);
        return;
    }

    await fs.appendFile(
        getPath(author),
        JSONL.stringify(data),
        config.encoding
    );
};

exports.filterNew = async (author, results) => {
    const oldLists = await exports.read(author);
    const oldLinks = oldLists.map((list) => list.link);
    return results.filter((result) => !oldLinks.includes(result.link));
};

exports.prune = async (author, fileData) => {
    if (!fileData) {
        fileData = JSONL.parse(
            await fs.readFile(getPath(author), config.encoding)
        );
    }

    const today = new Date();
    const lessThanWeekOld = fileData.filter(
        (entry) => new Date(entry.date) > weeksPriorTo(today, 1)
    );

    await fs.writeFile(
        getPath(author),
        JSONL.stringify(lessThanWeekOld),
        config.encoding
    );
};

function getPath(author) {
    return `${config.basePath}/${author
        .toLowerCase()
        .replace(/\s/g, '_')}.jsonl`;
}

function isValidAuthor(author) {
    return Object.values(AUTHORS).find((val) => val === author);
}
