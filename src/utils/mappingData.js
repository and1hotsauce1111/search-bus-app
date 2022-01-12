export const getAllStopsPosition = function (routeStopsData) {
  let allRoutePosition = { 0: [], 1: [] };

  routeStopsData[0].Stops.forEach((stop) =>
    allRoutePosition[0].push(stop.StopPosition),
  );
  routeStopsData[1].Stops.forEach((stop) =>
    allRoutePosition[1].push(stop.StopPosition),
  );

  return allRoutePosition;
};

export const mapingRouteStopsAndEstimatedTimeData = function (
  routeStopsData,
  estimateTimeData,
  nearByBus,
) {
  console.log(routeStopsData, estimateTimeData, nearByBus);

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

  nearByBus.forEach((bus) => {
    if (bus.Direction === 0) {
      const nearByBusIndex = routeStopsData[0].Stops.findIndex(
        (stop) => stop.StopUID === bus.StopUID,
      );
      if (nearByBusIndex > -1) {
        if (!routeStopsData[0].Stops[nearByBusIndex]['nearByBus']) {
          routeStopsData[0].Stops[nearByBusIndex]['nearByBus'] = [];
        }
        routeStopsData[0].Stops[nearByBusIndex]['nearByBus'].push(
          bus.PlateNumb,
        );
      }
    }
    if (bus.Direction === 1) {
      const nearByBusIndex = routeStopsData[1].Stops.findIndex(
        (stop) => stop.StopUID === bus.StopUID,
      );
      if (nearByBusIndex > -1) {
        if (!routeStopsData[1].Stops[nearByBusIndex]['nearByBus']) {
          routeStopsData[1].Stops[nearByBusIndex]['nearByBus'] = [];
        }
        routeStopsData[1].Stops[nearByBusIndex]['nearByBus'].push(
          bus.PlateNumb,
        );
      }
    }
  });

  return routeStopsData;
};
