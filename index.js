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
const Pusher = require("pusher");
const config = require("config");
let configPusher = config.get('pusher');
let timeout = ms => new Promise(res => setTimeout(res, ms));
let push = () => __awaiter(this, void 0, void 0, function* () {
    let pushBody;
    for (let cnt = 0; cnt < 1000; cnt++) {
        console.log("pushing");
        //pushBody = { "message": "hello world " + (new Date()).getTime() };
        //let pushData = "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111";
        let pushData = `test send count = ${cnt}`;
        pushBody = { "message": pushData };
        console.log(pushData.length);
        console.log("push => ", pushBody);
        yield pusher.trigger('my-channel', 'my-event', pushBody);
        yield timeout(10000); // 10s
        console.log("pushed");
    }
});
let pusher = new Pusher(configPusher);
push();
