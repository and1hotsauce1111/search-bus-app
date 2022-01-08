import * as types from './mutation-types';
import axios from 'axios';
import BusApi from '../apis/getBus';
import districtApi from '../apis/getDistrict';

export const getCurrentDistrict = function (
  { commit, state, dispatch },
  coords,
) {
  const position = { LocationX: coords.longitude, LocationY: coords.latitude };
  districtApi
    .getCurrentDistrict(position)
    .then((res) => {
      if (res.status === 200) {
        commit(types.GET_CURRENT_DISTRICT, res.data[0].City);
      }
    })
    .catch((err) => console.log(err));
};

export const getNearByBus = function ({ commit, state }, coords) {
  const position = { lat: coords.latitude, lng: coords.longitude };
  BusApi.getNearByBus(position)
    .then((res) => {
      if (res.status === 200) {
        commit(types.GET_NEARBY_CITY_BUS, res.data);
      }
    })
    .catch((err) => console.log(err));
};
