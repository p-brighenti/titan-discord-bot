exports.toJSON = (jsonl) =>
    JSON.parse(`[${jsonl.replace(/(\n|\r|\r\n)/g, ',').slice(0, -1)}]`);

// TODO: create new solution. will not work for entries storing an array of objects
exports.toJSONL = (json) =>
    `${json.substring(1, json.length - 1).replace(/},{/g, '}\n{')}\n`;
