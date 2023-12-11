/* eslint-disable object-shorthand */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import '../styles/main.css';
import '../component/list-card.js';
import swRegister from './utils/sw-register.js';
import App from './view/app.js';
import conector from './utils/connector.js';

const article = document.querySelector('article');
const menuIcon = document.querySelector('.container');
const drawer = document.querySelector('.drawer');

const app = new App({
  button: menuIcon,
  drawer: drawer,
  content: article,
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

window.addEventListener('hashchange', () => {
  article.innerHTML = '';
  app.renderPage();
});
