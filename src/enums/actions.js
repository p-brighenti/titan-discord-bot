const embedder = require('../utils/embedder');

const actions = {
    POST_LISTS: (channel, ...posts) => {
        posts.forEach((post) => {
            console.log('POST', post);
            if (!post.data.length) return;

            channel.send(embedder.build(post));
        });
    },
};

Object.freeze(actions);

module.exports = actions;
