import { busQueryString } from './config';
import getAuthorizationHeader from '@/utils/getAuthorizationHeader.js';
import axios from 'axios';


export default {
  getAllCityBus(city) {
    const select = [
      'City',
      'RouteName',
      'RouteUID',
      'DepartureStopNameZh',
      'DestinationStopNameZh',
      'FareBufferZoneDescriptionZh',
    ];
    const url = busQueryString(`Bus/Route/City/${city}`, { select, top: true });
    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  getNearByBus(position) {
    const select = [
      'City',
      'RouteName',
      'RouteUID',
      'DepartureStopNameZh',
      'DestinationStopNameZh',
      'FareBufferZoneDescriptionZh',
    ];
    const url = busQueryString('Bus/Route/NearBy', {
      position,
      filter: { type: 'nearby' },
      select,
      top: true,
    });
    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  getIntercitybusVehicleType(plateNumb) {
    const url = busQueryString(`Bus/Vehicle/InterCity`, {
      filter: { type: 'bus/type', plateNumb },
      top: false,
    });

    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  // for show bus card list
  getIntercitybusByRouteUIDs(routeUID) {
    const select = [
      'City',
      'RouteName',
      'RouteUID',
      'DepartureStopNameZh',
      'DestinationStopNameZh',
      'FareBufferZoneDescriptionZh',
    ];
    const url = busQueryString(`Bus/Route/InterCity`, {
      filter: { type: 'bus/route', routeUID },
      select,
      top: true,
    });
    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  // for search stopName or routeName
  getIntercitybusByStopNameKeyword(keyword) {
    const select = ['RouteUID'];
    const url = busQueryString(`Bus/StopOfRoute/InterCity`, {
      select,
      top: true,
      filter: { type: 'bus/stop', keyword },
    });
    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  getIntercitybusDisplayOfRouteStops(routeName) {
    const url = busQueryString(`Bus/StopOfRoute/InterCity/${routeName}`, {
      filter: { type: 'stop', routeName },
      top: true,
    });
    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  getIntercitybusEstimatedTimeOfArrival(routeName) {
    const url = busQueryString(
      `Bus/EstimatedTimeOfArrival/InterCity/${routeName}`,
      { filter: { type: 'stop', routeName }, top: false },
    );
    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  // all route bus position
  getIntercitybusCurrentRouteBusPosition(routeName) {
    const url = busQueryString(
      `Bus/RealTimeByFrequency/InterCity/${routeName}`,
      { filter: { type: 'stop', routeName }, top: false },
    );
    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  // all real time near by stop bus
  getIntercitybusRealTimeNearByBus(routeName) {
    const url = busQueryString(
      `Bus/RealTimeNearStop/InterCity/${routeName}`,
      { filter: { type: 'stop', routeName }, top: false },
    );

    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  getIntercitybusRouteShape(routeName) {
    const url = busQueryString(`Bus/Shape/InterCity/${routeName}`, {
      filter: { type: 'shape', routeName },
      top: true,
    });

    return axios.get(url, { headers: getAuthorizationHeader() });
  },
};
