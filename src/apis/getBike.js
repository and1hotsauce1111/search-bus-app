import { queryString } from './config';
import getAuthorizationHeader from '@/utils/getAuthorizationHeader.js';
import axios from 'axios';

export default {
  getNearByBikeStation(position) {
    const url = queryString(`Bike/Station/NearBy`, {
      position,
      filter: { type: 'nearby' },
      top: true,
    });

    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  getNearBikeAvailability(position) {
    const url = queryString(`Bike/Availability/NearBy`, {
      position,
      filter: { type: 'nearby' },
      top: true,
    });

    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  getBikeStationByKeyword(city, keyword) {
    const url = queryString(`Bike/Station/${city}`, {
      filter: { type: 'bike/stop', keyword },
      top: true,
    });

    return axios.get(url, { headers: getAuthorizationHeader() });
  },
  getBikeAvailabilityByStationUID(city, stationUIDs) {
    const url = queryString(`Bike/Availability/${city}`, {
      filter: { type: 'bike/availbility', StationUID: stationUIDs},
    })

    return axios.get(url, { headers: getAuthorizationHeader() });
  }
};
