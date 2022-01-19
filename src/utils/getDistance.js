export const getDistance = function (
  { userLat, userLng },
  { stationLat, stationLng },
  unit,
) {

  if (userLat == stationLat && userLng == stationLng) {
    return 0;
  } else {
    let radlat1 = (Math.PI * userLat) / 180;
    let radlat2 = (Math.PI * stationLat) / 180;
    let theta = userLng - stationLng;
    let radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'M') {
      dist = (dist * 1.609344) * 1000;
    }
    return Math.floor(dist);
  }
};
