import { headers, busQueryString } from './config';
import axios from 'axios';

const axiosInstance = axios.create({ headers });

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
    return axiosInstance.get(url);
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
    return axiosInstance.get(url);
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
    const url = busQueryString(`Bus/Route/City/${city}`, {
      filter: { type: 'bus/route', routeUID },
      select,
      top: true,
    });
    return axiosInstance.get(url);
  },
  // for search stopName or routeName
  getBusByStopNameKeyword(city, keyword) {
    const select = ['RouteUID'];
    const url = busQueryString(`Bus/StopOfRoute/City/${city}`, {
      select,
      top: false,
      filter: { type: 'bus/stop', keyword },
    });
    return axiosInstance.get(url);
  },
  getDisplayOfRouteStops(city, routeName) {
    const url = busQueryString(`Bus/StopOfRoute/City/${city}/${routeName}`, {
      filter: { type: 'stop', routeName },
      top: true,
    });
    return axiosInstance.get(url);
  },
  getEstimatedTimeOfArrival(city, routeName) {
    const url = busQueryString(
      `Bus/EstimatedTimeOfArrival/City/${city}/${routeName}`,
      { filter: { type: 'stop', routeName }, top: false },
    );
    return axiosInstance.get(url);
  },
  // all route bus position
  getCurrentRouteBusPosition(city, routeName) {
    const url = busQueryString(
      `Bus/RealTimeByFrequency/City/${city}/${routeName}`,
      { filter: { type: 'stop', routeName }, top: false },
    );
    return axiosInstance.get(url);
  },
  // all real time near by stop bus
  getRealTimeNearByBus(city, routeName) {
    const url = busQueryString(
      `Bus/RealTimeNearStop/City/${city}/${routeName}`,
      { filter: { type: 'stop', routeName }, top: false },
    );

    return axiosInstance.get(url);
  },
};
