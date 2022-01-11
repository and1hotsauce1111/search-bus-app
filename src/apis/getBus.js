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
    const url = busQueryString(`Bus/Route/City/${city}`, { select });
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
    });
    return axios.get(url, { headers });
  },
  getDisplayOfRouteStops(city, routeName) {
    const url = busQueryString(
      `Bus/EstimatedTimeOfArrival/City/${city}/${routeName}`,
      { filter: {type: 'stop', routeName} }
    );
    return axios.get(url, { headers });
  },
};
