/* eslint-disable linebreak-style */
/* eslint-disable space-before-blocks */
/* eslint-disable no-underscore-dangle */
const notificationHelper = {
  sendNotification({ title, options }) {
    if (!this._checkAvailability()) {
      console.log('Notification not supported in this browser');
      return;
    }

    if (!this._checkPermission()) {
      console.log('User did not yet granted permission');
      this._requestPermission();
      return;
    }

    this._showNotification({ title, options });
  },

  _checkAvailability(){
    return 'Notification' in window;
  },

  _checkPermission(){
    return Notification.permission === 'granted';
  },

  async _requestPermission(){
    const status = await Notification.requestPermission();

    if (status === 'denied'){
      window.alert('notification denied');
    }

    if (status === 'default'){
      window.alert('permision closed');
    }
  },

  async _showNotification({ title, options }) {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    serviceWorkerRegistration.showNotification(title, options);
  },

};

export default notificationHelper;