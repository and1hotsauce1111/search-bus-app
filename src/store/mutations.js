import * as types from './mutation-types';

const mutations = {
  [types.CLEAR_BUSLIST](state) {
    state.busCardList = [];
  },
  [types.CLEAR_BIKELIST](state) {
    state.bikeCardList = [];
  },
  [types.CLEAR_BUS_STOP_ROUTE](state) {
    state.busStopOfRoute = [];
  },
  [types.CHANGE_SEARCHING_STATUS](state) {
    state.isSearching = !state.isSearching;
  },
  [types.CHANGE_SIDEMENU_HEIGHT](state) {
    state.isChangeSideMenuHeight = !state.isChangeSideMenuHeight;
  },
  [types.GET_CURRENT_DISTRICT](state, district) {
    state.currentDistrict = district;
  },
  [types.GET_NEARBY_CITY_BUS](state, nearbyCityBus) {
    state.busCardList = nearbyCityBus;
  },
  [types.GET_NEARBY_CITY_BIKE](state, nearbyBikes) {
    state.bikeCardList = nearbyBikes;
  },
  [types.GET_BUS_BY_KEYWORD](state, busListByKeyword) {
    state.busCardList = busListByKeyword;
  },
  [types.GET_BIKE_STATION_BY_KEYWORD](state, bikeStations) {
    state.bikeCardList = bikeStations;
  },
  [types.GET_ALL_CITY_BUS](state, allCityBus) {
    state.busCardList = allCityBus;
  },
  [types.GET_BUS_STOPS_BY_ROUTE](state, stops) {
    state.busStopOfRoute = stops;
  },
  [types.GET_ALL_ROUTE_STOPS_POSITION](state, stops) {
    state.allRouteStopsPosition = stops;
  },
  [types.GET_ALL_ROUTE_BUS_POSITION](state, bus) {
    state.allRouteBusPosition = bus;
  },
  [types.GET_BUS_ROUTE_SHAPE](state, busRouteShapeData) {
    state.busRouteShapeData = busRouteShapeData;
  },
  [types.GET_USER_POSITON](state, position) {
    state.userPosition = position;
  },
  [types.TOGGLE_SHOW_BUS_STOP_DIRECTION](state, direction) {
    state.showBusStopDirection = direction;
  },
  [types.TOGGLE_GOTO_FIRST_STOP](state, isMove) {
    state.goToFirstStop = isMove;
  },
  [types.TOGGLE_GOTO_USER_POSITION](state) {
    state.goToUserPosition = !state.goToUserPosition;
  },
  [types.UPDATE_SEARCH_INPUT_VALUE](state, inputValue) {
    state.searchInputValue = inputValue;
  }
};

export default mutations;
