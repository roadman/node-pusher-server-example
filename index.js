'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Pusher = require("pusher");
const config = require("config");
let configPusher = config.get('pusher');
console.log(configPusher);
let pusher = new Pusher(configPusher);
pusher.trigger('my-channel', 'my-event', {
    "message": "hello world"
});
