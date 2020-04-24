const embeder = require('../utils/embeder');

const actions = {
    POST_LISTS: (channel, ...posts) => {
        posts.forEach((post) => {
            if (!post.data.length) return;

            channel.send(embeder.build(post));
        });
    },
};

Object.freeze(actions);

module.exports = actions;
