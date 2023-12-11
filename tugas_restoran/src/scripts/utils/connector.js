/* eslint-disable linebreak-style */
const conector = {
  conectToDetail(listCard) {
    listCard.addEventListener('click', () => {
      window.location.href = `/#/detail/${listCard.id}`;
    });
    listCard.addEventListener('keyup', (button) => {
      if (button.key === 'Enter') {
        window.location.href = `/#/detail/${listCard.id}`;
      }
    });
  },

  conectToMainPage() {
    const skipLink = document.querySelector('.skipToContent');
    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#main').focus();
    });
  },
};

export default conector;
