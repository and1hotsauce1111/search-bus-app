const state = {
  allRouteStopsPosition: {},
  allRouteBusPosition: [],
  busCardList: [],
  busStopOfRoute: [],
  busRouteShapeData: [],
  bikeCardList: [],
  currentDistrict: 'Taichung',
  goToUserPosition: false,
  goToFirstStop: true,
  isSearching: true,
  isChangeSideMenuHeight: false,
  isLoading: true,
  mobileNavSearchType: '',
  desktopNavSearchType: '',
  goBackToMobileSearch: false,
  searchInputValue: '',
  searchType: 'bus',
  showBusStopDirection: 0,
  userPosition: { lat: 24.136944, lng: 120.684722 },
};

export default state;
