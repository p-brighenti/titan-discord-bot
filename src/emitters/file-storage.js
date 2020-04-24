const EventEmitter = require('events');
const fileStorage = require('../storage/file-storage');

const EVENTS = {
    THRESHOLD_REACHED: 'threshold reached',
};

Object.freeze(EVENTS);

class FileStorageEmitter extends EventEmitter {}

const emitter = new FileStorageEmitter();

emitter.on(EVENTS.THRESHOLD_REACHED, (event) => {
    setImmediate(async () => {
        await fileStorage.prune(event.author, event.data);
        console.log(`${new Date()} - pruned ${event.author} entries`);
    });
});

exports.emitter = emitter;
exports.EVENTS = EVENTS;
