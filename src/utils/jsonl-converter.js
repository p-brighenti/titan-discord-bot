// TODO: needs to be able to handle functions

exports.toJSON = (jsonl) =>
    `[${jsonl.replace(/(\n|\r|\r\n)/g, ',').slice(0, -1)}]`;

// TODO: create new solution. will not work for entries storing an array of objects
exports.stringify = (data) => {
    const validShape = isValidShape(data);

    if (!validShape && typeof data !== 'string') {
        throw new Error('invalid JSONL object');
    }

    if (validShape) {
        console.log(data);
        data = JSON.stringify(data);
    }

    return `${data.substring(1, data.length - 1).replace(/},{/g, '}\n{')}\n`;
};

exports.parse = (jsonl) => JSON.parse(exports.toJSON(jsonl));

function isValidShape(obj) {
    return Array.isArray(obj) && obj.every((elem) => typeof elem === 'object');
}
