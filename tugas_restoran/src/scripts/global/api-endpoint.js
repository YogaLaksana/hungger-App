/* eslint-disable linebreak-style */
import CONFIG from './config';

const API_ENDPOINT = {
  LIST_DATA: `${CONFIG.BASE_URL}/list`,
  DETAIL: (ID) => `${CONFIG.BASE_URL}/detail/${ID}`,
};

export default API_ENDPOINT;
