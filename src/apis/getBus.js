import { ptx_baseUrl, headers } from './config';
import axios from 'axios';

export default {
  getAllCityBus(city) {
    return axios.get(
      ptx_baseUrl + `/v2/Bus/Route/City/${city}?$top=30&$format=JSON`,
      { headers },
    );
  },
  getNearByBus(position) {
    const { lng, lat } = position;
    return axios.get(
      ptx_baseUrl +
        `/v2/Bus/Route/NearBy?$top=30&$spatialFilter=nearby(${lat},${lng},500)&$format=JSON`,
      { headers },
    );
  },
};
