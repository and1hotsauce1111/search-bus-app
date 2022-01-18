import { queryString } from './config';
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
    const url = queryString(`Bus/Route/City/${city}`, { select, top: true });
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
    const url = queryString('Bus/Route/NearBy', {
      position,
      filter: { type: 'nearby' },
      select,
      top: true,
    });
    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  getBusVehicleType(city, plateNumb) {
    const url = queryString(`Bus/Vehicle/City/${city}`, {
      filter: { type: 'bus/type', plateNumb },
      top: false,
    });

    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  // for show bus card list
  getBusByRouteUIDs(city, routeUID) {
    const select = [
      'City',
      'RouteName',
      'RouteUID',
      'DepartureStopNameZh',
      'DestinationStopNameZh',
      'FareBufferZoneDescriptionZh',
    ];
    const url = queryString(`Bus/Route/City/${city}`, {
      filter: { type: 'bus/route', routeUID },
      select,
      top: true,
    });
    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  // for search stopName or routeName
  getBusByStopNameKeyword(city, keyword) {
    const select = ['RouteUID'];
    const url = queryString(`Bus/StopOfRoute/City/${city}`, {
      select,
      top: true,
      filter: { type: 'bus/stop', keyword },
    });
    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  getDisplayOfRouteStops(city, routeName) {
    const url = queryString(`Bus/StopOfRoute/City/${city}/${routeName}`, {
      filter: { type: 'stop', routeName },
      top: true,
    });
    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  getEstimatedTimeOfArrival(city, routeName) {
    const url = queryString(
      `Bus/EstimatedTimeOfArrival/City/${city}/${routeName}`,
      { filter: { type: 'stop', routeName }, top: false },
    );
    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  // all route bus position
  getCurrentRouteBusPosition(city, routeName) {
    const url = queryString(
      `Bus/RealTimeByFrequency/City/${city}/${routeName}`,
      { filter: { type: 'stop', routeName }, top: false },
    );
    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  // all real time near by stop bus
  getRealTimeNearByBus(city, routeName) {
    const url = queryString(
      `Bus/RealTimeNearStop/City/${city}/${routeName}`,
      { filter: { type: 'stop', routeName }, top: false },
    );

    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  getBusRouteShape(city, routeName) {
    const url = queryString(`Bus/Shape/City/${city}`, {
      filter: { type: 'shape', routeName },
      top: true,
    });

    return axios.get(url, { headers: getAuthorizationHeader() });
  },
};
