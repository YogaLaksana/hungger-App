/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import NotificationHelper from './notification-helper';
import CONFIG from '../global/config';

const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    const Data = JSON.parse(message.data);

    NotificationHelper.sendNotification({
      title: `${Data.title}`,
      options: {
        body: Data.overview,
        image: `${CONFIG.IMAGE_LINK + Data.PictureId}`,
      },
    });
  },
};

export default WebSocketInitiator;
