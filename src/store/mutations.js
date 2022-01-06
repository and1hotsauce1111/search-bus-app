import * as types from './mutation-types';

const mutations = {
  [types.GET_ALL_CITY_BUS](state, allCityBus) {
    state.allCityBus = allCityBus;
  }
};


export default mutations;