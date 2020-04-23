const fs = require('fs').promises;
const config = require('../config/file-storage');
const AUTHORS = require('../enums/authors');
const JSONL = require('../utils/jsonl-converter');

exports.read = async (author) => {
    if (!Object.values(AUTHORS).find((val) => val === author)) {
        console.error(`abort read: invalid author ${author}`);
        return;
    }

    const data = await fs.readFile(
        `${config.basePath}/${convertAuthorName(author)}.jsonl`,
        config.encoding
    );

    return JSONL.parse(data);
};

function convertAuthorName(author) {
    return author.toLowerCase().replace(/\s/g, '_');
}
