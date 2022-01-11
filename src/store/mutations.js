import * as types from './mutation-types';

const mutations = {
  [types.CLEAR_BUSLIST](state) {
    state.busCardList = [];
  },
  [types.CHANGE_SEARCHING_STATUS](state) {
    state.isSearching = !state.isSearching;
  },
  [types.GET_CURRENT_DISTRICT](state, district) {
    state.currentDistrict = district;
  },
  [types.GET_NEARBY_CITY_BUS](state, nearbyCityBus) {
    state.busCardList = nearbyCityBus;
  },
  [types.GET_BUS_BY_KEYWORD](state, busListByKeyword) {
    state.busCardList = busListByKeyword;
  },
  [types.GET_ALL_CITY_BUS](state, allCityBus) {
    state.busCardList = allCityBus;
  },
  [types.GET_BUS_STOPS_BY_ROUTE](state, stops) {
    state.busStopOfRoute = stops;
  },
};

export default mutations;
