export const filterRouteStopData = function (routeStopData, direction) {
  if(!Object.keys(routeStopData).length) return [];

  const filteredData = { 0: [], 1: [] };
  routeStopData[0].forEach((stop) =>
    filteredData[0].push({
      stopName: stop.stopName,
      position: {
        lat: stop.position.PositionLat,
        lng: stop.position.PositionLon,
      },
      destination: stop.destination,
    }),
  );
  routeStopData[1].forEach((stop) =>
    filteredData[1].push({
      stopName: stop.stopName,
      position: {
        lat: stop.position.PositionLat,
        lng: stop.position.PositionLon,
      },
      destination: stop.destination,
    }),
  );

  return filteredData[direction];
};

export const getAllStopsPosition = function (routeStopsData, currentSelectedRoute) {
  if(!routeStopsData.length) return [];

  const allRoutePosition = { 0: [], 1: [] };

  routeStopsData[0].Stops.forEach((stop) =>
    allRoutePosition[0].push({
      stopName: stop.StopName.Zh_tw,
      position: stop.StopPosition,
      destination: currentSelectedRoute.DestinationStopNameZh,
    }),
  );
  routeStopsData[1].Stops.forEach((stop) =>
    allRoutePosition[1].push({
      stopName: stop.StopName.Zh_tw,
      position: stop.StopPosition,
      destination: currentSelectedRoute.DepartureStopNameZh,
    }),
  );

  return allRoutePosition;
};

export const mapingRouteStopsAndEstimatedTimeData = function (
  routeStopsData,
  estimateTimeData,
  nearByBus,
) {
  // console.log(routeStopsData, estimateTimeData, nearByBus);
  if (!routeStopsData.length || !estimateTimeData.length) return [];

  // map estimateTimeData to routeStopData
  estimateTimeData.forEach((estimate) => {
    if (estimate.Direction === 0) {
      const targetStopIndex = routeStopsData[0].Stops.findIndex(
        (stop) => stop.StopUID === estimate.StopUID,
      );
      if (targetStopIndex > -1) {
        routeStopsData[0].Stops[targetStopIndex]['StopStatus'] =
          estimate.StopStatus;
        routeStopsData[0].Stops[targetStopIndex]['EstimateTime'] =
          estimate.EstimateTime;
        routeStopsData[0].Stops[targetStopIndex]['NextBusTime'] =
          estimate.NextBusTime;
      }
    }
    if (estimate.Direction === 1) {
      const targetStopIndex = routeStopsData[1].Stops.findIndex(
        (stop) => stop.StopUID === estimate.StopUID,
      );
      if (targetStopIndex > -1) {
        routeStopsData[1].Stops[targetStopIndex]['StopStatus'] =
          estimate.StopStatus;
        routeStopsData[1].Stops[targetStopIndex]['EstimateTime'] =
          estimate.EstimateTime;
        routeStopsData[1].Stops[targetStopIndex]['NextBusTime'] =
          estimate.NextBusTime;
      }
    }
  });

  // map nearbyBusData to routeStopData
  nearByBus.forEach((bus) => {
    if (bus.Direction === 0) {
      const nearByBusIndex = routeStopsData[0].Stops.findIndex(
        (stop) => stop.StopUID === bus.StopUID,
      );
      if (nearByBusIndex > -1) {
        if (!routeStopsData[0].Stops[nearByBusIndex]['NearByBus']) {
          routeStopsData[0].Stops[nearByBusIndex]['NearByBus'] = [];
        }
        routeStopsData[0].Stops[nearByBusIndex]['NearByBus'].push(bus);
      }
    }
    if (bus.Direction === 1) {
      const nearByBusIndex = routeStopsData[1].Stops.findIndex(
        (stop) => stop.StopUID === bus.StopUID,
      );
      if (nearByBusIndex > -1) {
        if (!routeStopsData[1].Stops[nearByBusIndex]['NearByBus']) {
          routeStopsData[1].Stops[nearByBusIndex]['NearByBus'] = [];
        }
        routeStopsData[1].Stops[nearByBusIndex]['NearByBus'].push(bus);
      }
    }
  });

  return routeStopsData;
};
