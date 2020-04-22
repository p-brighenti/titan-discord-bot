const dayInMilliseconds = 86400000;

// (most likely) does not account for daylight savings
exports.weeksPriorTo = (dateMilis, weeks = 1) =>
    new Date(dateMilis - dayInMilliseconds * weeks * 7);
