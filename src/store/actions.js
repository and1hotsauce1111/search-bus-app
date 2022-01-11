import * as types from './mutation-types';
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

export const getAllCityBus = function ({ commit, state }, city) {
  BusApi.getAllCityBus(city)
    .then((res) => {
      if (res.status === 200) {
        commit(types.GET_ALL_CITY_BUS, res.data);
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

export const getBusByKeyword = function ({ commit, state }, searchInput) {
  const { city, keyword } = searchInput;
  BusApi.getBusByKeyword(city, keyword)
    .then((res) => {
      if (res.status === 200) {
        commit(types.GET_BUS_BY_KEYWORD, res.data);
      }
    })
    .catch((err) => console.log(err));
};

export const getDisplayOfRouteStops = function ({ commit, state }, searchInfo) {
  const { city, routeName } = searchInfo;
  BusApi.getDisplayOfRouteStops(city, routeName)
    .then((res) => {
      if(res.status === 200) {
        commit(types.GET_BUS_STOPS_BY_ROUTE, res.data);
        commit(types.CHANGE_SEARCHING_STATUS);
      }
    })
    .catch((err) => console.log(err));
};
