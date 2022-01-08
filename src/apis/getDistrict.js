import { gist_baseUrl, headers } from './config';
import axios from 'axios';

export default {
  getCurrentDistrict(position) {
    const { LocationX, LocationY } = position;

    return axios.get(
      gist_baseUrl +
        `/V3/Map/GeoLocating/District/LocationX/${LocationX}/LocationY/${LocationY}?$format=JSON`,
      {
        headers,
      },
    );
  },
};
