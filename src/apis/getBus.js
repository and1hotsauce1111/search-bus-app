import { headers, busQueryString } from './config';
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
    return axios.get(url, { headers });
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
      top: true
    });
    return axios.get(url, { headers });
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
      top: true
    });
    return axios.get(url, { headers });
  },
  getDisplayOfRouteStops(city, routeName) {
    const url = busQueryString(`Bus/StopOfRoute/City/${city}/${routeName}`, {
      filter: { type: 'stop', routeName },
      top: true
    });
    return axios.get(url, { headers });
  },
  // estimate time of arrival
  // ​/v2​/Bus​/EstimatedTimeOfArrival​/City​/{City}​/{RouteName}
  getEstimatedTimeOfArrival(city, routeName) {
    const url = busQueryString(
      `Bus/EstimatedTimeOfArrival/City/${city}/${routeName}`,
      { filter: { type: 'stop', routeName }, top: false },
    );
    return axios.get(url, { headers });
  },
  // get current route bus position
  // ​/v2​/Bus​/RealTimeByFrequency​/City​/{City}​/{RouteName}
};
