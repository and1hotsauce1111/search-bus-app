import * as types from './mutation-types';

const mutations = {
  [types.GET_CURRENT_DISTRICT](state, district) {
    state.currentDistrict = district;
  },
  [types.GET_NEARBY_CITY_BUS](state, nearbyCityBus) {
    state.busCardList = nearbyCityBus;
  }
};


export default mutations;