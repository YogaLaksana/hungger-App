/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import { menuTemplate, descriptionTemplate, reviewTemplate } from '../tempelate/template.js';
import UrlParser from '../../routes/url-parser.js';
import getDataFromAPI from '../../data/data.js';
import LikeButtonInitiator from '../../utils/like-buton-initiator.js';
import CONFIG from '../../global/config.js';

const detailPage = {
  async getData() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantId = url.id;
    const { restaurant } = await getDataFromAPI.getDetailData(restaurantId);
    this._restaurant = restaurant;
  },

  async render() {
    await this.getData();
    return `
    <div tabindex="0" class="detail-page">
    <h1>${this._restaurant.name}</h1>
    <div tabindex="0" class="desc-container"></div>
    <div tabindex="0" class="other-container"></div>
    <div id="likeButtonContainer"></div>
  </div>`;
  },

  async afterRender() {
    await this.getData();
    const descContainer = document.querySelector('.desc-container');
    const otherContainer = document.querySelector('.other-container');
    this.contentInitiator({
      descContainer: descContainer,
      otherContainer: otherContainer,
      ID: this._restaurant.id,
    });
  },

  async contentInitiator({
    descContainer, otherContainer, ID,
  }) {
    const menu = await menuTemplate.render(ID);
    const review = await reviewTemplate.render(ID);
    const desc = await descriptionTemplate.render(ID);
    descContainer.appendChild(desc);
    otherContainer.appendChild(menu);
    otherContainer.appendChild(review);
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      Data: {
        id: this._restaurant.id,
        name: this._restaurant.name,
        rating: this._restaurant.rating,
        pictureId: this._restaurant.pictureId,
      },
    });
  },
};

export default detailPage;
