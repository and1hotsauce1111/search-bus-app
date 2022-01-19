export const filterRouteStopData = function (routeStopData, direction) {
  if (!Object.keys(routeStopData).length) return [];

  const filteredData = { 0: [], 1: [] };

  // only direction 0 or 1
  if (Object.keys(routeStopData).length === 1) {
    for (let i = 0, len = routeStopData[0].length; i < len; i++) {
      filteredData[0].push({
        stopName: routeStopData[0][i].stopName,
        position: {
          lat: routeStopData[0][i].position.PositionLat,
          lng: routeStopData[0][i].position.PositionLon,
        },
        destination: routeStopData[0][i].destination,
      });
    }

    for (let i = 0, len = routeStopData[0].length; i < len; i++) {
      filteredData[1].push({
        stopName: routeStopData[0][i].stopName,
        position: {
          lat: routeStopData[0][i].position.PositionLat,
          lng: routeStopData[0][i].position.PositionLon,
        },
        destination: routeStopData[0][i].destination,
      });
    }

    console.log('filteredData', filteredData);

    return filteredData[direction];
  }

  for (let i = 0, len = routeStopData[0].length; i < len; i++) {
    filteredData[0].push({
      stopName: routeStopData[0][i].stopName,
      position: {
        lat: routeStopData[0][i].position.PositionLat,
        lng: routeStopData[0][i].position.PositionLon,
      },
      destination: routeStopData[0][i].destination,
    });
  }

  for (let i = 0, len = routeStopData[1].length; i < len; i++) {
    filteredData[1].push({
      stopName: routeStopData[1][i].stopName,
      position: {
        lat: routeStopData[1][i].position.PositionLat,
        lng: routeStopData[1][i].position.PositionLon,
      },
      destination: routeStopData[1][i].destination,
    });
  }

  return filteredData[direction];
};

export const getAllStopsPosition = function (
  routeStopsData,
  currentSelectedRoute,
) {
  if (!routeStopsData.length) return [];

  const allRoutePosition = { 0: [], 1: [] };

  // only direction 0 or 1
  if (routeStopsData.length === 1) {
    for (let i = 0, len = routeStopsData[0].Stops.length; i < len; i++) {
      allRoutePosition[0].push({
        stopName: routeStopsData[0].Stops[i].StopName.Zh_tw,
        position: routeStopsData[0].Stops[i].StopPosition,
        destination: currentSelectedRoute.DestinationStopNameZh,
      });
    }

    delete allRoutePosition[1];

    return allRoutePosition;
  }

  for (let i = 0, len = routeStopsData[0].Stops.length; i < len; i++) {
    allRoutePosition[0].push({
      stopName: routeStopsData[0].Stops[i].StopName.Zh_tw,
      position: routeStopsData[0].Stops[i].StopPosition,
      destination: currentSelectedRoute.DestinationStopNameZh,
    });
  }

  for (let i = 0, len = routeStopsData[1].Stops.length; i < len; i++) {
    allRoutePosition[1].push({
      stopName: routeStopsData[1].Stops[i].StopName.Zh_tw,
      position: routeStopsData[1].Stops[i].StopPosition,
      destination: currentSelectedRoute.DepartureStopNameZh,
    });
  }

  return allRoutePosition;
};

export const mappingRouteStopsAndEstimatedTimeData = function (
  routeStopsData,
  estimateTimeData,
  nearByBus,
) {
  // console.log(routeStopsData, estimateTimeData, nearByBus);
  if (!routeStopsData.length || !estimateTimeData.length) return [];

  // map estimateTimeData to routeStopData
  for (let i = 0, len = estimateTimeData.length; i < len; i++) {
    if (estimateTimeData[i].Direction === 0) {
      const targetStopIndex = routeStopsData[0].Stops.findIndex(
        (stop) => stop.StopUID === estimateTimeData[i].StopUID,
      );
      if (targetStopIndex > -1) {
        routeStopsData[0].Stops[targetStopIndex]['StopStatus'] =
          estimateTimeData[i].StopStatus;
        routeStopsData[0].Stops[targetStopIndex]['EstimateTime'] =
          estimateTimeData[i].EstimateTime;
        routeStopsData[0].Stops[targetStopIndex]['NextBusTime'] =
          estimateTimeData[i].NextBusTime;
      }
    }
    if (estimateTimeData[i].Direction === 1) {
      const targetStopIndex = routeStopsData[1].Stops.findIndex(
        (stop) => stop.StopUID === estimateTimeData[i].StopUID,
      );
      if (targetStopIndex > -1) {
        routeStopsData[1].Stops[targetStopIndex]['StopStatus'] =
          estimateTimeData[i].StopStatus;
        routeStopsData[1].Stops[targetStopIndex]['EstimateTime'] =
          estimateTimeData[i].EstimateTime;
        routeStopsData[1].Stops[targetStopIndex]['NextBusTime'] =
          estimateTimeData[i].NextBusTime;
      }
    }
  }

  // map nearbyBusData to routeStopData
  for (let i = 0, len = nearByBus.length; i < len; i++) {
    if (nearByBus[i].Direction === 0) {
      const nearByBusIndex = routeStopsData[0].Stops.findIndex(
        (stop) => stop.StopUID === nearByBus[i].StopUID,
      );
      if (nearByBusIndex > -1) {
        if (!routeStopsData[0].Stops[nearByBusIndex]['NearByBus']) {
          routeStopsData[0].Stops[nearByBusIndex]['NearByBus'] = [];
        }
        routeStopsData[0].Stops[nearByBusIndex]['NearByBus'].push(nearByBus[i]);
      }
    }
    if (nearByBus[i].Direction === 1) {
      const nearByBusIndex = routeStopsData[1].Stops.findIndex(
        (stop) => stop.StopUID === nearByBus[i].StopUID,
      );
      if (nearByBusIndex > -1) {
        if (!routeStopsData[1].Stops[nearByBusIndex]['NearByBus']) {
          routeStopsData[1].Stops[nearByBusIndex]['NearByBus'] = [];
        }
        routeStopsData[1].Stops[nearByBusIndex]['NearByBus'].push(nearByBus[i]);
      }
    }
  }

  return routeStopsData;
};

export const mappingBikeStationAndAvailabilityData = function (
  nearbyStationData,
  nearbyAvailabilityData,
) {
  if (!nearbyAvailabilityData.length || !nearbyStationData.length) return [];

  for (let i = 0, len = nearbyStationData.length; i < len; i++) {
    const targetIndex = nearbyAvailabilityData.findIndex(nearby => nearby.StationUID === nearbyStationData[i].StationUID);

    if (targetIndex > -1) {
      if (!nearbyStationData[i]['Availability']) {
        nearbyStationData[i]['Availability'] = {};
        nearbyStationData[i]['Availability'] =
          nearbyAvailabilityData[targetIndex];
      }
    }
  }

  return nearbyStationData;
};
