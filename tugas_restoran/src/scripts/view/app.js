/* eslint-disable space-before-blocks *//* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import UrlParser from '../routes/url-parser';
import routes from '../routes/router';
import DrawerInitiator from '../utils/drawer-initiator';
import conector from '../utils/connector';

class App {
  constructor({ content, button, drawer }) {
    this._content = content;
    this._button = button;
    this._drawer = drawer;
    this._initialAppShell();
    conector.conectToMainPage();
  }

  _initialAppShell(){
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    const pageDisplay = await page.render();
    this._content.innerHTML = pageDisplay;
    await page.afterRender();
  }
}

export default App;
