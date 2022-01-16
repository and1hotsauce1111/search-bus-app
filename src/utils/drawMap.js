import 'leaflet/dist/leaflet.css';
import L, { marker } from 'leaflet';
import userPosIcon from '../assets/mark/user-position.png';
import busStopIcon from '../assets/mark/bus-stop.png';
import { wktToGeoJSON } from '@terraformer/wkt';
import { layer } from '@fortawesome/fontawesome-svg-core';

const defaultPosition = [24.136944, 120.684722];

class DrawMap {
  constructor(position) {
    this.busStopIcon = L.icon({ iconUrl: busStopIcon });
    this.geojsonLayer = null;
    this.position = position || defaultPosition;
    this.map = L.map('map', {
      center: this.position,
      zoom: 18, // 0 - 18
      attributionControl: true,
      zoomControl: false,
      zoomAnimation: true,
    });
    this.tileLayer = null;
    this.userPositionIcon = L.icon({
      iconUrl: userPosIcon,
    });
    this.userMarker = L.marker(this.position, {
      icon: this.userPositionIcon,
    }).addTo(this.map);
  }

  init() {
    this.tileLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ).addTo(this.map);
  }

  drawLine(geometry, isMove) {
    const busLine = wktToGeoJSON(geometry);
    const busLineStyle = {
      color: '#4EA476',
      weight: 4,
    };
    const firstStop = busLine.coordinates[0];
    this.geojsonLayer = L.geoJSON(busLine, { style: busLineStyle }).addTo(
      this.map,
    );
    if (isMove) this.map.panTo({ lat: firstStop[1], lng: firstStop[0] });
  }

  drawStopIcon(stopInfo, type) {
    if (!stopInfo.length) return;

    let icon = null;
    let popUpContent = '';
    let popUpOptions = {
      closeButton: false,
      autoClose: false,
    };
    if (type === 'stop') icon = this.busStopIcon;

    for (let i = 0; i < stopInfo.length; i++) {
      popUpContent = `
        <div class="popup">
          <div class="popup-title">${stopInfo[i].stopName}</div>
          <div class="popup-content">往 ${stopInfo[i].destination}</div>
        </div>
      `;
      new L.marker(
        { lat: stopInfo[i].position.lat, lng: stopInfo[i].position.lng },
        {
          icon,
        },
      )
        .bindPopup(popUpContent, popUpOptions)
        .addTo(this.map);
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

  removeLayer() {
    this.map.eachLayer((layer) => {
      if (layer !== this.tileLayer) layer.remove();
    });
  }

  updateUserPosition(position) {
    const lat = position.latitude;
    const lng = position.longitude;
    this.userMarker.setLatLng({ lat, lng });
    this.map.panTo({ lat, lng });
  }
}

export default DrawMap;
