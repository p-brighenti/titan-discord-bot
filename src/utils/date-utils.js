const dayInMilliseconds = 86400000;

// (most likely) does not account for daylight savings
exports.weeksPriorTo = (date, weeks = 1) =>
    new Date(date.getTime() - dayInMilliseconds * weeks * 7);

exports.formatDate = (date, format) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return format.replace('d', day).replace('m', month).replace('y', year);
};
