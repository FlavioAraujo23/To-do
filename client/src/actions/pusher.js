import Pusher from 'pusher-js'
Pusher.logToConsole = true;
export const pusher = new Pusher('27a5212638fb2efdcfbb', {
  cluster: 'mt1'
});