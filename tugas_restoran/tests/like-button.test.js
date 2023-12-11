/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import FavoriteIdb from '../src/scripts/data/favorite-idb';
import LikeButtonInitiator from '../src/scripts/utils/like-buton-initiator';

const likebutton = async () => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    Data: { id: 1 },
  });
};

describe('like buton test', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };
  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should be return like button restaurant ', async () => {
    await likebutton(1);
    expect(
      document.querySelector('[aria-label="like this restaurnt"]'),
    ).toBeTruthy();
  });

  it('should not be return unlike button restaurant ', async () => {
    await likebutton();
    expect(
      document.querySelector('[aria-label="unlike this restaurant"]'),
    ).toBeFalsy();
  });

  it('should able to add to favoriteDb', async () => {
    await likebutton();
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const favoriteRestaurant = await FavoriteIdb.getAllData();
    expect(favoriteRestaurant).toEqual([{ id: 1 }]);
    await FavoriteIdb.deleteData(1);
  });

  it('should not to like 2 times', async () => {
    await likebutton();
    await FavoriteIdb.putData({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteIdb.getAllData()).toEqual([{ id: 1 }]);
    await FavoriteIdb.deleteData(1);
  });
  it('should not to add data without id', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      Data: {},
    });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteIdb.getAllData()).toEqual([]);
  });
});
