import * as types from './mutation-types';
import BusApi from '../apis/getBus';
import BikeApi from '../apis/getBike';
import DistrictApi from '../apis/getDistrict';
import InterCityBusApi from '../apis/getInterCityBus';
import {
  mapingRouteStopsAndEstimatedTimeData,
  getAllStopsPosition,
} from '@/utils/mappingData.js';

/** search city bus */
export const getCurrentDistrict = function (
  { commit, state, dispatch },
  position,
) {
  const currentPosition = { LocationX: position.lng, LocationY: position.lat};
  DistrictApi
    .getCurrentDistrict(currentPosition)
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

export const getNearByBus = function ({ commit, state }, position) {
  BusApi.getNearByBus(position)
    .then((res) => {
      if (res.status === 200) {
        commit(types.GET_NEARBY_CITY_BUS, res.data);
      }
    })
    .catch((err) => console.log(err));
};

// filter routes by stopName or routeName
export const getBusByKeyword = async function ({ commit, state }, searchInput) {
  const { city, keyword } = searchInput;

  const { data: result, status: status1 } =
    await BusApi.getBusByStopNameKeyword(city, keyword);
  if (status1 === 200 && result.length) {
    const routUIDs = [];
    for (let i = 0, len = result.length; i < len; i++) {
      routUIDs.push(result[i].RouteUID);
    }

    const { data: searchResult, status: status2 } =
      await BusApi.getBusByRouteUIDs(city, routUIDs);
    if (status2 === 200) commit(types.GET_BUS_BY_KEYWORD, searchResult);
  }
};

// show all stops of selected route
export const getBusDisplayOfRouteStops = async function (
  { commit, state },
  searchInfo,
) {
  const { type, city, routeName, changeSideMenuHeight, currentSelectedRoute } =
    searchInfo;

  let requestRouteStops = '';
  let requestEstimateTime = '';
  let requestRouteBusPosition = '';
  let requestNearByBus = '';
  let requestRouteShape = '';


  if(type === 'bus') {
    requestRouteStops = BusApi.getDisplayOfRouteStops(city, routeName);
    requestEstimateTime = BusApi.getEstimatedTimeOfArrival(city, routeName);
    requestRouteBusPosition = BusApi.getCurrentRouteBusPosition(
      city,
      routeName,
    );
    requestNearByBus = BusApi.getRealTimeNearByBus(city, routeName);
    requestRouteShape = BusApi.getBusRouteShape(city, routeName);
  }
  if(type === 'intercityBus') {
    requestRouteStops = InterCityBusApi.getIntercitybusDisplayOfRouteStops(routeName);
    requestEstimateTime = InterCityBusApi.getIntercitybusEstimatedTimeOfArrival(routeName);
    requestRouteBusPosition = InterCityBusApi.getIntercitybusCurrentRouteBusPosition(routeName);
    requestNearByBus  = InterCityBusApi.getIntercitybusRealTimeNearByBus(routeName);
    requestRouteShape  = InterCityBusApi.getIntercitybusRouteShape(routeName);
  }

  const start = Date.now();
  console.log('start', start);

  let nearByBusData = null;
  let estimateTimeData = null;
  let routeStopsData = null;

  await Promise.all([
    requestRouteStops,
    requestEstimateTime,
    requestRouteBusPosition,
    requestNearByBus,
    requestRouteShape,
  ]).then((value) => {
    if (
      value[0].status === 200 &&
      value[1].status === 200 &&
      value[2].status === 200 &&
      value[3].status === 200 &&
      value[4].status === 200
    ) {
      routeStopsData = value[0].data;
      estimateTimeData = value[1].data;
      nearByBusData = value[3].data;
      const busPositionData = value[2].data;
      const routeShapeData = value[4].data;

      commit(types.GET_ALL_ROUTE_BUS_POSITION, busPositionData);
      commit(types.GET_BUS_ROUTE_SHAPE, routeShapeData);

      const allRouteStopsPosition = getAllStopsPosition(
        routeStopsData,
        currentSelectedRoute,
      );
      commit(types.GET_ALL_ROUTE_STOPS_POSITION, allRouteStopsPosition);
    }
  });

  // get nearby bus vehicle type
  if (nearByBusData.length) {
    const plateNumb = [];
    nearByBusData.forEach((bus) => plateNumb.push(bus.PlateNumb));
    if(type === 'bus') {
      BusApi.getBusVehicleType(city, plateNumb).then((res) => {
        if (res.status === 200) {
          if (res.data.length) {
            for (let i = 0, len = res.data.length; i < len; i++) {
              const targetIndex = nearByBusData.findIndex(
                (bus) => bus.PlateNumb === res.data[i].PlateNumb,
              );
              if (targetIndex > -1) {
                nearByBusData[targetIndex]['VehicleType'] =
                  res.data[i].VehicleType;
              } else {
                nearByBusData[targetIndex]['VehicleType'] = null;
              }
            }
          }
          const mappingData = mapingRouteStopsAndEstimatedTimeData(
            routeStopsData,
            estimateTimeData,
            nearByBusData,
          );
          commit(types.GET_BUS_STOPS_BY_ROUTE, mappingData);
          if (changeSideMenuHeight) commit(types.CHANGE_SIDEMENU_HEIGHT);
        }
      });
    }

    if(type === 'intercityBus') {
      InterCityBusApi.getIntercitybusVehicleType(plateNumb).then((res) => {
        if (res.status === 200) {
          if (res.data.length) {
            for (let i = 0, len = res.data.length; i < len; i++) {
              const targetIndex = nearByBusData.findIndex(
                (bus) => bus.PlateNumb === res.data[i].PlateNumb,
              );
              if (targetIndex > -1) {
                nearByBusData[targetIndex]['VehicleType'] =
                  res.data[i].VehicleType;
              } else {
                nearByBusData[targetIndex]['VehicleType'] = null;
              }
            }
          }
          const mappingData = mapingRouteStopsAndEstimatedTimeData(
            routeStopsData,
            estimateTimeData,
            nearByBusData,
          );
          commit(types.GET_BUS_STOPS_BY_ROUTE, mappingData);
          if (changeSideMenuHeight) commit(types.CHANGE_SIDEMENU_HEIGHT);
        }
      });
    }

  } else {
    const mappingData = mapingRouteStopsAndEstimatedTimeData(
      routeStopsData,
      estimateTimeData,
      nearByBusData,
    );
    commit(types.GET_BUS_STOPS_BY_ROUTE, mappingData);
    if (changeSideMenuHeight) commit(types.CHANGE_SIDEMENU_HEIGHT);
  }

  console.log('end', Date.now() - start);
};

/** search inter city bus */
export const getIntercityBusByKeyword = async function (
  { commit, state },
  keyword,
) {
  const { data: result, status: status1 } =
    await InterCityBusApi.getIntercitybusByStopNameKeyword(keyword);

  if (status1 === 200 && result.length) {
    const routUIDs = [];
    for (let i = 0, len = result.length; i < len; i++) {
      routUIDs.push(result[i].RouteUID);
    }

    const { data: searchResult, status: status2 } =
      await InterCityBusApi.getIntercitybusByRouteUIDs(routUIDs);
    if (status2 === 200) commit(types.GET_BUS_BY_KEYWORD, searchResult);
  }
};

/** search bike */
// search by keyword

// search nearby station
export const getNearByBikeStation = async function({ commit, state }, position) {
  const requestNearByBikeStation = BikeApi.getNearByBikeStation(position);
  const requestNearByBikeAvailability = BikeApi.getNearBikeAvailability(position);

  Promise.all([requestNearByBikeStation, requestNearByBikeAvailability]).then(values => {
    console.log('nearby station', values[0]);
    console.log('nearby availability', values[1]);
  })
}


