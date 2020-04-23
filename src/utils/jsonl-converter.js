exports.toJSON = (jsonl) =>
    `[${jsonl.replace(/(\n|\r|\r\n)/g, ',').slice(0, -1)}]`;

// TODO: create new solution. will not work for entries storing an array of objects
exports.stringify = (json) => {
    if (typeof json == 'object') {
        return exports.toJSONL(exports.toJSON(json));
    }

    return `${json.substring(1, json.length - 1).replace(/},{/g, '}\n{')}\n`;
};

exports.parse = (jsonl) => JSON.parse(exports.toJSON(jsonl));
