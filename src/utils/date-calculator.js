const dayInMilliseconds = 86400000;

exports.weeksPriorTo = (dateMilis, weeks = 1) =>
    new Date(dateMilis - dayInMilliseconds * weeks * 7);
