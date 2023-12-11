/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Workbox } from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported in the browser');
    return;
  }
  const wb = new Workbox('./sw.bundle.js');
  try {
    await wb.register();
    console.log('Service worker registered');
  } catch (error) {
    window.alert('Failed to register service worker', error);
  }
};

export default swRegister;
