'use strict';

const Pusher = require('pusher');
import * as PusherJs from 'pusher-js';
import * as config   from 'config';

interface IConfigPuhser {
  appId     :string;
  key       :string;
  secret    :string;
  cluster   :string;
  encrypted :boolean;
  authEndpoint: string;
}

const configPusher = config.get<IConfigPuhser>('pusher');
const channelName:string = process.env.CHANNEL_NAME; // 'my-channel';
const eventName:string   = process.env.EVENT_NAME;   // 'my-event';

console.log(`running CHANNEL_NAME=${channelName},EVENT_NAME=${eventName}`);

// pusher subscriber
(() => {
  const socket = new PusherJs(
    configPusher.key,
    {
      cluster     : configPusher.cluster,
      authEndpoint: configPusher.authEndpoint,
      encrypted   : configPusher.encrypted
    }
  );

  const channel = socket.subscribe(channelName);
  channel.bind_global((event, data) => {
    console.log(`---> subscribe callback: `, event, data);
  });
})();

  const pusherIns = new Pusher({
    appId     :configPusher.appId,
    key       :configPusher.key,
    secret    :configPusher.secret,
    cluster   :configPusher.cluster,
    encrypted :configPusher.encrypted
  });

// pusher trigger
(async () => {
  let timeout = (ms:number) => new Promise(res => setTimeout(res, ms));

  for(let cnt = 0; cnt < 1000; cnt++) {
    console.log(`---> send ${channelName},${eventName}: ` + cnt);
    pusherIns.trigger(
      channelName,
      eventName,
      {
        "message": `test send count = ${cnt}`
      }
    );
    await timeout(10000); // 10s
  }
})();
