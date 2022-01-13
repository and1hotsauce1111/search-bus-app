export const busCardList = (state) => state.busCardList;
export const busStopOfRoute = (state) => state.busStopOfRoute;
export const currentDistrict = (state) => state.currentDistrict;
export const fareBufferZoneDescriptionZh = (state) => (RouteUID) => {
  const targetBus = state.busCardList.find((bus) => bus.RouteUID === RouteUID);
  if (!targetBus.FareBufferZoneDescriptionZh) return [];
  return targetBus.FareBufferZoneDescriptionZh.split('－');
};
export const isSearching = (state) => state.isSearching;
export const isChangeSideMenuHeight = (state) => state.isChangeSideMenuHeight;
export const searchInputValue = (state) => state.searchInputValue;
