export const ptx_baseUrl = 'https://ptx.transportdata.tw/MOTC/v2/';
export const gist_baseUrl = 'https://gist.motc.gov.tw/gist_api';


const selectString = (select) => {
  return select.reduce((acc, cur, index) => {
    let concat = index === 0 ? cur : ', ' + cur;
    return acc + concat;
  }, '$select=');
};

const filterMultipleDataString = (column, dataArr) => {
  return dataArr.reduce((acc, cur, index, array) => {
    let concat = '';
    if(index === array.length - 1) {
      concat = column + ' ' + 'eq' + ' ' + "'" + cur + "'";
    } else {
      concat = column + ' ' + 'eq' + ' ' + "'" + cur + "'" + ' ' + 'or' + ' ';
    }
    
    return acc + concat;
  }, '$filter=');
};

const filterBusByStopString = (keyword) =>
  `$filter=(Stops/any(d:(contains(d/StopName/Zh_tw, '${keyword}') eq true)) or Contains(RouteName/Zh_tw, '${keyword}') eq true) and Direction eq 0`;

const filterExactRoute = (routeName) => `$filter=RouteName/Zh_tw eq '${routeName}'`;
const nearByBusString = (position) =>
  `$spatialFilter=nearby(${position.lat},${position.lng},500)`;

export const busQueryString = (
  dataType,
  query = { select: null, filter: null, position: null, top: true },
) => {
  let requestUrl = '';
  if(query.top) requestUrl += '?$top=15';
  if (query.filter && query.filter.type === 'bus/route') {
    if(requestUrl === '') {
      requestUrl = requestUrl + '?' + filterMultipleDataString('RouteUID', query.filter.routeUID)
    }else {
      requestUrl = requestUrl + '&' + filterMultipleDataString('RouteUID', query.filter.routeUID)
    }
  }

  if (query.filter && query.filter.type === 'bus/type') {
    if(requestUrl === '') {
      requestUrl = requestUrl + '?' + filterMultipleDataString('PlateNumb', query.filter.plateNumb)
    }else {
      requestUrl = requestUrl + '&' + filterMultipleDataString('PlateNumb', query.filter.plateNumb)
    }
  }

  if (query.filter && query.filter.type === 'bus/stop') {
    if(requestUrl === '') {
      requestUrl = requestUrl + '?' + filterBusByStopString(query.filter.keyword)
    }else {
      requestUrl = requestUrl + '&' + filterBusByStopString(query.filter.keyword)
    }
  }
  
  if (query.filter && query.filter.type === 'nearby') {
    if(requestUrl === '') {
      requestUrl = requestUrl + '?' + nearByBusString(query.position)
    }else {
      requestUrl = requestUrl + '&' + nearByBusString(query.position)
    }
  }
  if(query.filter && (query.filter.type === 'stop' || query.filter.type === 'shape')) {
    if(requestUrl === '') {
      requestUrl = requestUrl + '?' + filterExactRoute(query.filter.routeName)
    }else {
      requestUrl = requestUrl + '&' + filterExactRoute(query.filter.routeName)
    }
  }
  if (query.select && query.select) {
    if(requestUrl === '') {
      requestUrl = requestUrl + '?' + selectString(query.select)
    }else {
      requestUrl = requestUrl + '&' + selectString(query.select)
    }
  }
  requestUrl += '&$format=JSON';

  return encodeURI(`${ptx_baseUrl}${dataType}${requestUrl}`);
};
