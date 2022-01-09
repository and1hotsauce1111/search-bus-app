import * as types from './mutation-types';

const mutations = {
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
  [types.CLEAR_BUSLIST](state) {
    state.busCardList = [];
  }
};


export default mutations;