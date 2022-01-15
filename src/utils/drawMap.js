import 'leaflet/dist/leaflet.css';
import L, { marker } from 'leaflet';
import userPosIcon from '../assets/mark/user-position.png';
import busStopIcon from '../assets/mark/bus-stop.png';
import { wktToGeoJSON } from '@terraformer/wkt';

const defaultPosition = [24.136944, 120.684722];

class DrawMap {
  constructor(position) {
    this.busStopIcon = L.icon({ iconUrl: busStopIcon });
    this.geojsonLayer = null;
    this.map = L.map('map', {
      center: this.position,
      zoom: 18, // 0 - 18
      attributionControl: true,
      zoomControl: false,
      zoomAnimation: true,
    });
    this.position = position || defaultPosition;
    this.userPositionIcon = L.icon({
      iconUrl: userPosIcon,
    });
    this.userMarker = L.marker(this.position, {
      icon: this.userPositionIcon,
    }).addTo(this.map);
  }

  init() {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      this.map,
    );
  }

  drawLine(geometry) {
    const busLine = wktToGeoJSON(geometry);
    const busLineStyle = {
      color: '#4EA476',
      weight: 4,
    };
    const firstStop = busLine.coordinates[0];
    this.geojsonLayer = L.geoJSON(busLine, { style: busLineStyle }).addTo(this.map);
    this.map.panTo({ lat: firstStop[1], lng: firstStop[0] });
  }

  drawBusStopIcon(coords) {
    if (!coords.length) return;
    for (let i = 0; i < coords.length; i++) {
      new L.marker(
        { lat: coords[i].lat, lng: coords[i].lng },
        {
          icon: this.busStopIcon,
        },
      ).addTo(this.map);
    }
  }

  getGeoInfo() {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position);
          },
          (err) => {
            alert('無法判斷當前位置或使用者拒絕定位，將導向預設地點');
            reject({ errMsg: err.message });
          },
        );
      } else {
        alert('不支援GPS定位');
      }
    });
  }

  removeGeoJSONLayer() {
    if(!this.geojsonLayer) return;
    this.map.removeLayer(this.geojsonLayer);
  }

  updateUserPosition(position) {
    const lat = position.latitude;
    const lng = position.longitude;
    this.userMarker.setLatLng({ lat, lng });
    this.map.panTo({ lat, lng });
  }
}

export default DrawMap;
