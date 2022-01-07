import * as types from './mutation-types';

const mutations = {
  [types.GET_ALL_CITY_BUS](state, allCityBus) {
    state.allCityBus = allCityBus;
  },
  [types.GET_NEARBY_CITY_BUS](state, nearbyCityBus) {
    state.nearbyCityBus = nearbyCityBus;
  }
};


export default mutations;