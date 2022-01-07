import allCity from '../../static/CityCountyData.json';


export default function getCityNameZh(cityNameEn) {
   return allCity.filter(city => city.CityEngName === cityNameEn)[0].CityName || '';
}