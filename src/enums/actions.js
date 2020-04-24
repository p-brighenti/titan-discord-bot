const embedder = require('../utils/embedder');

const actions = {
    POST_LISTS: (channel, post) => {
        if (!post.data.length) return;

        channel.send(embedder.build(post));
    },
};

Object.freeze(actions);

module.exports = actions;
