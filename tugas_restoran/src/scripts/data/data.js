/* eslint-disable linebreak-style */
import API_ENDPOINT from '../global/api-endpoint';

class getDataFromAPI {
  static async getListData() {
    const response = await fetch(API_ENDPOINT.LIST_DATA);
    return response.json();
  }

  static async getDetailData(ID) {
    const response = await fetch(API_ENDPOINT.DETAIL(ID));
    return response.json();
  }
}
export default getDataFromAPI;
