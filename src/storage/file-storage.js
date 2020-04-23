const fs = require('fs').promises;
const config = require('../config/file-storage');
const AUTHORS = require('../enums/authors');
const JSONL = require('../utils/jsonl-converter');

exports.read = async (author) => {
    if (!isValidAuthor(author)) {
        console.error(`abort read: invalid author ${author}`);
        return;
    }

    const data = await fs.readFile(getPath(author), config.encoding);

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

function getPath(author) {
    return `${config.basePath}/${author
        .toLowerCase()
        .replace(/\s/g, '_')}.jsonl`;
}

function isValidAuthor(author) {
    return Object.values(AUTHORS).find((val) => val === author);
}
