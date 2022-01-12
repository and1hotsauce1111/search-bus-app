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
  getBusByKeyword(city, keyword) {
    const select = [
      'City',
      'RouteName',
      'RouteUID',
      'DepartureStopNameZh',
      'DestinationStopNameZh',
      'FareBufferZoneDescriptionZh',
    ];
    const url = busQueryString(`Bus/Route/City/${city}`, {
      filter: { type: 'bus', keyword },
      select,
      top: true,
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
