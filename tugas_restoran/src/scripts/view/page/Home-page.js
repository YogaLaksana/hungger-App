/* eslint-disable linebreak-style */
import getDataFromAPI from '../../data/data';
import conector from '../../utils/connector';
import attributeSetter from '../../utils/atributeSetter';

const homePage = {
  async render() {
    return `<div class="list-container">
    </div>`;
  },

  async afterRender() {
    const listContainer = document.querySelector('.list-container');
    const { restaurants } = await getDataFromAPI.getListData();
    restaurants.forEach((listdata) => {
      const listCard = document.createElement('list-card');
      attributeSetter(listCard, 'custom-card', listdata.id);
      conector.conectToDetail(listCard);
      listCard.data = listdata;
      listContainer.appendChild(listCard);
      // eslint-disable-next-line linebreak-style
    });
  },
};
export default homePage;
