export const mapingRouteStopsAndEstimatedTimeData = function (
  routeStopsData,
  estimateTimeData,
) {
  console.log(routeStopsData, estimateTimeData);

  estimateTimeData.forEach((estimate) => {
    if (estimate.Direction === 0) {
      const targetIndex = routeStopsData[0].Stops.findIndex(
        (stop) => stop.StopUID === estimate.StopUID,
      );
      if (targetIndex > -1) {
        routeStopsData[0].Stops[targetIndex]['StopStatus'] =
          estimate.StopStatus;
        routeStopsData[0].Stops[targetIndex]['EstimateTime'] =
          estimate.EstimateTime;
        routeStopsData[0].Stops[targetIndex]['NextBusTime'] =
          estimate.NextBusTime;
      }
    }
    if (estimate.Direction === 1) {
      const targetIndex = routeStopsData[1].Stops.findIndex(
        (stop) => stop.StopUID === estimate.StopUID,
      );
      if (targetIndex > -1) {
        routeStopsData[1].Stops[targetIndex]['StopStatus'] =
          estimate.StopStatus;
        routeStopsData[1].Stops[targetIndex]['EstimateTime'] =
          estimate.EstimateTime;
        routeStopsData[1].Stops[targetIndex]['NextBusTime'] =
          estimate.NextBusTime;
      }
    }
  });

  return routeStopsData;
};