'use strict';

import * as Pusher from 'pusher';
import * as config from 'config';

let configPusher = config.get('pusher');

let timeout = ms => new Promise(res => setTimeout(res, ms));

let push = async () => {
  let pushBody;
  for(let cnt = 0; cnt < 1000; cnt++) {
    console.log("pushing");

    //pushBody = { "message": "hello world " + (new Date()).getTime() };
    //let pushData = "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111";
    let pushData = `test send count = ${cnt}`;
    pushBody = { "message": pushData };

    console.log(pushData.length);

    console.log("push => ", pushBody);
    await pusher.trigger('my-channel', 'my-event', pushBody);
    await timeout(10000); // 10s

    console.log("pushed");
  }
};

let pusher = new Pusher(configPusher);

push();
