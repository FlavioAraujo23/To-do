const Pusher = require('pusher');
require('dotenv').config();

const pusher = new Pusher({
  appId: process.env.WS_PUSHER_APP_ID,
  key: process.env.WS_PUSHER_KEY,
  secret: process.env.WS_PUSHER_SECRET,
  cluster: process.env.WS_PUSHER_CLUSTER,
  useTLS: true,
});

module.exports = pusher;