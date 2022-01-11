export const busCardList = (state) => state.busCardList;
export const busStopOfRoute = (state) => {
  return state.busStopOfRoute.reduce(
    (result, cur) => {
      if (cur.Direction === 0) {
        result[0].push(cur);
      } else if (cur.Direction === 1) {
        result[1].push(cur);
      }

      return result;
    },
    { 0: [], 1: [] },
  );
};
export const currentDistrict = (state) => state.currentDistrict;
export const fareBufferZoneDescriptionZh = (state) => (RouteUID) => {
  const targetBus = state.busCardList.find((bus) => bus.RouteUID === RouteUID);
  if (!targetBus.FareBufferZoneDescriptionZh) return [];
  return targetBus.FareBufferZoneDescriptionZh.split('－');
};
