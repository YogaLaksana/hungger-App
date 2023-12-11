/* eslint-disable linebreak-style */
import '../../../component/list-card';
import FavoriteIdb from '../../data/favorite-idb';
import conector from '../../utils/connector';
import attributeSetter from '../../utils/atributeSetter';

const favoritePage = {
  render() {
    return `
    <div class="list-container"> </div>`;
  },

  async afterRender() {
    const listData = await FavoriteIdb.getAllData();
    const listContainer = document.querySelector('.list-container');
    listData.forEach((data) => {
      const listCard = document.createElement('list-card');
      attributeSetter(listCard, 'awokawok', data.id);
      listCard.data = data;
      conector.conectToDetail(listCard);
      listContainer.appendChild(listCard);
    });
  },
};

export default favoritePage;
