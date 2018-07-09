'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pusher = require('pusher');
const PusherJs = require("pusher-js");
const config = require("config");
const configPusher = config.get('pusher');
const channelName = process.env.CHANNEL_NAME; // 'my-channel';
const eventName = process.env.EVENT_NAME; // 'my-event';
console.log(`running CHANNEL_NAME=${channelName},EVENT_NAME=${eventName}`);
// pusher subscriber
(() => {
    const socket = new PusherJs(configPusher.key, {
        cluster: configPusher.cluster,
        authEndpoint: configPusher.authEndpoint,
        encrypted: configPusher.encrypted
    });
    const channel = socket.subscribe(channelName);
    channel.bind_global((event, data) => {
        console.log(`---> subscribe callback: `, event, data);
    });
})();
const pusherIns = new Pusher({
    appId: configPusher.appId,
    key: configPusher.key,
    secret: configPusher.secret,
    cluster: configPusher.cluster,
    encrypted: configPusher.encrypted
});
// pusher trigger
(() => __awaiter(this, void 0, void 0, function* () {
    let timeout = (ms) => new Promise(res => setTimeout(res, ms));
    for (let cnt = 0; cnt < 1000; cnt++) {
        console.log(`---> send ${channelName},${eventName}: ` + cnt);
        pusherIns.trigger(channelName, eventName, {
            "message": `test send count = ${cnt}`
        });
        yield timeout(10000); // 10s
    }
}))();
