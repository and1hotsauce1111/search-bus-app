import * as types from './mutation-types';
import BusApi from '../apis/getBus';
import districtApi from '../apis/getDistrict';
import {
  mapingRouteStopsAndEstimatedTimeData,
  getAllStopsPosition,
} from '@/utils/mappingData.js';

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

// filter routes by city 
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

// filter routes by stopName or routeName
export const getBusByKeyword = function ({ commit, state }, searchInput) {
  const { city, keyword } = searchInput;

  const requestStopByKeyword = BusApi.getBusByStopNameKeyword(city, keyword);

  requestStopByKeyword
    .then((res) => {
      if (res.status === 200) {
        if (res.data.length) {
          const routUIDs = [];
          res.data.forEach((data) => routUIDs.push(data.RouteUID));
          BusApi.getBusByRouteUIDs(city, routUIDs).then((response) => {
            if (response.status === 200) {
              commit(types.GET_BUS_BY_KEYWORD, response.data);
            }
          });
        }
      }
    })
    .catch((err) => console.log(err));
};

// show all stops of selected route
export const getDisplayOfRouteStops = function ({ commit, state }, searchInfo) {
  const { city, routeName } = searchInfo;

  const requestRouteStops = BusApi.getDisplayOfRouteStops(city, routeName);
  const requestEstimateTime = BusApi.getEstimatedTimeOfArrival(city, routeName);
  const requestRouteBusPosition = BusApi.getCurrentRouteBusPosition(
    city,
    routeName,
  );
  const requestNearByBus = BusApi.getRealTimeNearByBus(city, routeName);

  Promise.all([
    requestRouteStops,
    requestEstimateTime,
    requestRouteBusPosition,
    requestNearByBus,
  ]).then((value) => {
    if (
      value[0].status === 200 &&
      value[1].status === 200 &&
      value[2].status === 200 &&
      value[3].status === 200
    ) {
      commit(types.GET_ALL_ROUTE_BUS_POSITION, value[2].data);

      const allRouteStopsPosition = getAllStopsPosition(value[0].data);
      commit(types.GET_ALL_ROUTE_STOPS_POSITION, allRouteStopsPosition);

      const mappingData = mapingRouteStopsAndEstimatedTimeData(
        value[0].data,
        value[1].data,
        value[3].data,
      );
      commit(types.GET_BUS_STOPS_BY_ROUTE, mappingData);
      commit(types.CHANGE_SIDEMENU_HEIGHT);
    }
  });
};
