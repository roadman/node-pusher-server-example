'use strict';

import * as Pusher from 'pusher';
import * as config from 'config';

let configPusher = config.get('pusher');
console.log(configPusher);

let pusher = new Pusher(configPusher);

pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
});
