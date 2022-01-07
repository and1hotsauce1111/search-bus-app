import { createStore } from 'vuex';
import state from './state';
import * as actions from './actions';
import * as getters from './getters'
import mutations from './mutations';

export default createStore({
  state,
  getters,
  mutations,
  actions
});