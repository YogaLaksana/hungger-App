/* eslint-disable linebreak-style */
import getDataFromAPI from '../../data/data';
import CONFIG from '../../global/config';
import attributeSetter from '../../utils/atributeSetter';

async function getdata(ID) {
  try {
    const Data = await getDataFromAPI.getDetailData(ID);
    const detailData = Data.restaurant;
    return detailData;
  } catch (error) {
    console.error(error);
  }
  return 0;
}

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurnt" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const menuTemplate = {
  async render(ID) {
    const { menus } = await getdata(ID);
    const menuContainer = document.createElement('div');
    attributeSetter(menuContainer, 'menu', null);
    menuContainer.innerHTML = '<h2> menu </h2>';
    this.menuDisplay(menus, menuContainer);
    return menuContainer;
  },

  menuDisplay(menus, menuContainer) {
    Object.keys(menus).forEach((menu) => { // berfungsi untuk melakukan loop pada nilai menus
      const menuPage = document.createElement('div');
      menuPage.innerHTML = `<h3>${menu}</h3>`;
      const listContainer = document.createElement('ul');
      attributeSetter(listContainer, 'menu-list-container');
      menuPage.id = menu;
      this.menuList(listContainer, menu, menus);
      menuPage.appendChild(listContainer);
      menuContainer.appendChild(menuPage);
    });
  },

  menuList(listContainers, menu, menus) {
    menus[menu].forEach((menuItem) => {
      const menuList = document.createElement('li');
      attributeSetter(menuList, 'menu-name');
      menuList.innerHTML = menuItem.name;
      listContainers.appendChild(menuList);
    });
  },

};

const descriptionTemplate = {
  async render(ID) {
    const likeButton = createLikeButtonTemplate();
    const descData = await getdata(ID);
    const descContainer = document.createElement('div');
    descContainer.innerHTML = this.template(descData, likeButton);
    return descContainer;
  },
  template(descData) {
    return `
          <ul>
            <li><img src="${CONFIG.IMAGE_LINK}${descData.pictureId}" alt="poster for ${descData.name}"/></li>
            <li tabindex="0">Addres : <span>${descData.address}</span> </li>
            <li>City : <span>${descData.city}</span></li>
            <li>
              Description:
              <p>
                ${descData.description}
              </p>
            </li>
          </ul>
    `;
  },
};

const reviewTemplate = {
  async render(ID) {
    const detailData = await getdata(ID);
    const { customerReviews } = detailData;
    const reviewContainer = document.createElement('div');
    attributeSetter(reviewContainer, 'review-container');
    const reviewUl = document.createElement('ul');
    attributeSetter(reviewUl, 'review');
    reviewContainer.innerHTML = `<h2>Riview <span> ✰ ${detailData.rating} </span></h2>`;
    this.comentList(reviewUl, customerReviews);
    reviewContainer.appendChild(reviewUl);
    return reviewContainer;
  },
  comentList(reviewUl, customerReviews) {
    customerReviews.forEach((list) => {
      const listReview = document.createElement('li');

      attributeSetter(listReview, 'list-review');
      listReview.innerHTML = `
        <h3>${list.name} <span>${list.date}</span></h3>
        <p>
          ${list.review}
        </p>
      </li>
      `;
      reviewUl.appendChild(listReview);
    });
  },

};

export {
  menuTemplate,
  descriptionTemplate,
  reviewTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
