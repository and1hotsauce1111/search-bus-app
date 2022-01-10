import getAuthorizationHeader from '@/utils/getAuthorizationHeader.js';

export const headers = getAuthorizationHeader();
export const ptx_baseUrl = 'https://ptx.transportdata.tw/MOTC/v2/';
export const gist_baseUrl = 'https://gist.motc.gov.tw/gist_api';

const selectString = (select) => {
  return select.reduce((acc, cur, index) => {
    let concat = index === 0 ? cur : ', ' + cur;
    return acc + concat;
  }, '&$select=');
};

// const filterBusString = (keyword) =>
//   `?$filter=Stops/any(d:(contains(d/StopName/Zh_tw, '${keyword}') eq true)) or contains(RouteName/Zh_tw, '${keyword}')`;
const filterBusString = (keyword) =>
  `&$filter=contains(RouteName/Zh_tw, '${keyword}')`;
const nearByBusString = (position) =>
  `&$spatialFilter=nearby(${position.lat},${position.lng},500)`;

export const busQueryString = (
  dataType,
  query = { select: null, filter: null, position: null },
) => {
  let requestUrl = '';
  requestUrl += '?$top=30';
  if (query.filter && query.filter.type === 'bus')
  requestUrl += filterBusString(query.filter.keyword);
  if (query.filter && query.filter.type === 'nearby')
  requestUrl += nearByBusString(query.position);
  if (query.select && query.select) requestUrl += selectString(query.select);
  requestUrl += '&$format=JSON';

  return encodeURI(`${ptx_baseUrl}${dataType}${requestUrl}`);
};
