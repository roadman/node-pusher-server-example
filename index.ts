'use strict';

import * as Pusher from 'pusher';
import * as config from 'config';

let configPusher = config.get('pusher');

let timeout = ms => new Promise(res => setTimeout(res, ms));

let push = async () => {
  let pushBody;
  for(let cnt = 0; cnt < 1000; cnt++) {
    console.log("pushing");

    pushBody = { "message": "hello world " + (new Date()).getTime() };

    console.log("push => ", pushBody);
    await pusher.trigger('my-channel', 'my-event', pushBody);
    await timeout(3000);

    console.log("pushed");
  }
};

let pusher = new Pusher(configPusher);

push();
