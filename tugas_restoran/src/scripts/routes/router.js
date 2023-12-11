/* eslint-disable linebreak-style */
/* eslint-disable quotes */
import homePage from "../view/page/Home-page";
import detailPage from "../view/page/detail-page";
import favoritePage from "../view/page/favorite-page";

const routes = {
  '/': homePage,
  '/home-page': homePage,
  '/detail/:id': detailPage,
  '/favorite-page': favoritePage,
};

export default routes;
