/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
import FavoriteIdb from '../src/scripts/data/favorite-idb';
import LikeButtonInitiator from '../src/scripts/utils/like-buton-initiator';

const likebutton = async () => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    Data: { id: 1 },
  });
};
describe('unlike button test', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteIdb.putData({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteIdb.deleteData(1);
  });
  it('should display unlike button when id in faforitedb', async () => {
    await likebutton();
    expect(
      document.querySelector('[aria-label="unlike this restaurant"]'),
    ).toBeTruthy();
  });

  it('should display like button when unlike button clicked', async () => {
    await likebutton();
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(
      document.querySelector('[aria-label="like this restaurant"]'),
    ).toBeTruthy();
  });

  it('should be able to remove id from favoriteIDB when unlike buton clicked', async () => {
    await likebutton();
    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));
    expect(await FavoriteIdb.getAllData()).toEqual([]);
  });
});
