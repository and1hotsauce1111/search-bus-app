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
  const { city, routeName, changeSideMenuHeight, currentSelectedRoute } = searchInfo;

  const requestRouteStops = BusApi.getDisplayOfRouteStops(city, routeName);
  const requestEstimateTime = BusApi.getEstimatedTimeOfArrival(city, routeName);
  const requestRouteBusPosition = BusApi.getCurrentRouteBusPosition(
    city,
    routeName,
  );
  const requestNearByBus = BusApi.getRealTimeNearByBus(city, routeName);
  const requestRouteShape = BusApi.getBusRouteShape(city, routeName);


  const start = Date.now();
  console.log('start', start);

  Promise.all([
    requestRouteStops,
    requestEstimateTime,
    requestRouteBusPosition,
    requestNearByBus,
    requestRouteShape
  ]).then((value) => {
    if (
      value[0].status === 200 &&
      value[1].status === 200 &&
      value[2].status === 200 &&
      value[3].status === 200 &&
      value[4].status === 200
    ) {

      const routeStopsData = value[0].data;
      const estimateTimeData = value[1].data;
      const busPositionData = value[2].data;
      const nearByBusData = value[3].data;
      const routeShapeData = value[4].data;

      commit(types.GET_ALL_ROUTE_BUS_POSITION, busPositionData);
      commit(types.GET_BUS_ROUTE_SHAPE, routeShapeData);

      const allRouteStopsPosition = getAllStopsPosition(routeStopsData, currentSelectedRoute);
      commit(types.GET_ALL_ROUTE_STOPS_POSITION, allRouteStopsPosition);

      // get nearby bus vehicle type
      if(nearByBusData.length) {
        const plateNumb = [];
        nearByBusData.forEach(bus => plateNumb.push(bus.PlateNumb))
        BusApi.getBusVehicleType(city, plateNumb).then(res => {
          if(res.status === 200) {
            if(res.data.length) {
              res.data.forEach(vehicle => {
                const targetIndex = nearByBusData.findIndex(bus => bus.PlateNumb === vehicle.PlateNumb);
                if(targetIndex > -1) {
                  nearByBusData[targetIndex]['VehicleType'] = vehicle.VehicleType;
                }else {
                  nearByBusData[targetIndex]['VehicleType'] = null
                }
              })
            }
            const mappingData = mapingRouteStopsAndEstimatedTimeData(
              routeStopsData,
              estimateTimeData,
              nearByBusData,
            );
            commit(types.GET_BUS_STOPS_BY_ROUTE, mappingData);
            if(changeSideMenuHeight) commit(types.CHANGE_SIDEMENU_HEIGHT);
          }         
        })
      } else {
        const mappingData = mapingRouteStopsAndEstimatedTimeData(
          routeStopsData,
          estimateTimeData,
          nearByBusData,
        );
        commit(types.GET_BUS_STOPS_BY_ROUTE, mappingData);
        if(changeSideMenuHeight) commit(types.CHANGE_SIDEMENU_HEIGHT);
      }
    }

    console.log('end', Date.now() - start);
  });
};
