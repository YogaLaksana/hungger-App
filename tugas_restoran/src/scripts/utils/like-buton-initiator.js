/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import FavoriteIdb from '../data/favorite-idb';
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../view/tempelate/template';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, Data }) {
    this._likeButtonContainer = likeButtonContainer;
    this._Data = Data;
    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._Data;

    if (await this._isDataExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isDataExist(id) {
    const Data = await FavoriteIdb.getData(id);
    return !!Data;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteIdb.putData(this._Data);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteIdb.deleteData(this._Data.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
