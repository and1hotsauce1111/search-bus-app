import * as types from './mutation-types';
import axios from 'axios';
import BusApi from '../apis/getBus';
import districtApi from '../apis/getDistrict';

export const getCurrentDistrictBus = async function ({ commit, state, dispatch }, coords) {
  const position = { LocationX: coords.longitude, LocationY: coords.latitude };
  const { data, status } = await districtApi.getCurrentDistrict(position);
  if(status === 200) {
    const currentDistrict = data[0].City || 'Taichung';
    dispatch("getAllCityBus", currentDistrict);
  }
}


export const getAllCityBus = function ({ commit, state }, city) {
  BusApi.getAllCityBus(city)
    .then(res => {
      if (res.status === 200) {
        commit(types.GET_ALL_CITY_BUS, res.data);
      }
    })
    .catch(err => console.log(err))
}

export const getNearByBus = function ({ commit, state }, coords) {
  const position = { lat: coords.latitude, lng: coords.longitude };
  BusApi.getNearByBus(position)
    .then(res => {
      if (res.status === 200) {
        commit(types.GET_NEARBY_CITY_BUS, res.data);
      }
    })
    .catch(err => console.log(err));
}
