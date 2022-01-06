import * as types from './mutation-types';
import axios from 'axios';
import getAuthorizationHeader from '@/utils/getAuthorizationHeader.js';


const baseUrl = 'https://ptx.transportdata.tw/MOTC';

export const getAllCityBus = function({ commit, state }, city) {
  const url = baseUrl + `/v2/Bus/Route/City/${city}`;
  console.log('header', getAuthorizationHeader());
  axios.get(url, { headers: getAuthorizationHeader()})
      .then((res) => {
        console.log(res.data);
        console.log(types.GET_ALL_CITY_BUS);
        commit(types.GET_ALL_CITY_BUS, res.data);
      })
      .catch(err => console.log(err))
}