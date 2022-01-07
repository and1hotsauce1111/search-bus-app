import { ptx_baseUrl } from "./config";
import axios from 'axios';
import getAuthorizationHeader from '@/utils/getAuthorizationHeader.js';

export default {
  getAllCityBus(city) {
    return axios.get(ptx_baseUrl + `/v2/Bus/Route/City/${city}?$format=JSON`, { headers: getAuthorizationHeader() });
  },
  getNearByBus(position) {
    const { lng, lat } = position;
    return axios.get(ptx_baseUrl + `/v2/Bus/Route/NearBy?$spatialFilter=nearby(${lat},${lng},500)&$format=JSON`, 
    { headers: getAuthorizationHeader()});
  }
}