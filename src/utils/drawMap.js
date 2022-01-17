import 'leaflet/dist/leaflet.css';
import L, { marker } from 'leaflet';
import userPosIcon from '../assets/mark/user-position.png';
import busStopIcon from '../assets/mark/bus-stop.png';
import busIcon from '../assets/mark/BusPoint.png';
import { wktToGeoJSON } from '@terraformer/wkt';

const defaultPosition = [24.136944, 120.684722];

class DrawMap {
  constructor(position) {
    this.position = position || defaultPosition;

    this.tileLayer = null;

    this.geojsonLayer = null;

    this.map = L.map('map', {
      center: this.position,
      zoom: 18, // 0 - 18
      attributionControl: true,
      zoomControl: false,
      zoomAnimation: true,
    });

    this.busIcon = L.icon({ iconUrl: busIcon });

    this.busStopIcon = L.icon({ iconUrl: busStopIcon });

    this.userPositionIcon = L.icon({
      iconUrl: userPosIcon,
    });
  }

  init() {
    this.tileLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ).addTo(this.map);
  }

  drawLine(geometry) {
    if (!geometry) return;

    // clear layer
    this.removeLayer();

    const busLine = wktToGeoJSON(geometry);
    const busLineStyle = {
      color: '#4EA476',
      weight: 4,
    };
    this.geojsonLayer = L.geoJSON(busLine, { style: busLineStyle }).addTo(
      this.map,
    );
  }

  drawStopIcon(stopInfo, isMove) {
    if (!stopInfo.length) return;

    let popUpContent = '';
    let popUpOptions = {
      closeButton: false,
      closeOnClick: true,
    };
    const firstStopPosition = {
      lat: stopInfo[0].position.lat,
      lng: stopInfo[0].position.lng,
    };

    for (let i = 0, len = stopInfo.length; i < len; i++) {
      popUpContent = `
        <div class="popup">
          <div class="popup-title">${stopInfo[i].stopName}</div>
          <div class="popup-content">往 ${stopInfo[i].destination}</div>
        </div>
      `;
      const marker = new L.marker(
        { lat: stopInfo[i].position.lat, lng: stopInfo[i].position.lng },
        {
          icon: this.busStopIcon,
        },
      )
        .bindPopup(popUpContent, popUpOptions)
        .addTo(this.map);

      if (i === 0 && isMove) marker.openPopup(firstStopPosition);
    }

    if (isMove) this.map.panTo(firstStopPosition);
  }

  drawBusIcon(busInfo, direction) {
    if (!busInfo.length) return;

    if (busInfo.length === 1) {
      for (let i = 0, len = busInfo.length; i < len; i++) {
        const marker = new L.marker(
          {
            lat: busInfo[i].BusPosition.PositionLat,
            lng: busInfo[i].BusPosition.PositionLon,
          },
          {
            icon: this.busIcon,
          },
        ).addTo(this.map);
      }
    }

    for (let i = 0, len = busInfo.length; i < len; i++) {
      if (busInfo[i].Direction === direction) {
        const marker = new L.marker(
          {
            lat: busInfo[i].BusPosition.PositionLat,
            lng: busInfo[i].BusPosition.PositionLon,
          },
          {
            icon: this.busIcon,
          },
        ).addTo(this.map);
      }
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

  updateUserPosition({ lat, lng }) {
    const userMarker = L.marker(
      { lat, lng },
      {
        icon: this.userPositionIcon,
      },
    ).addTo(this.map);
    this.map.panTo({ lat, lng });
  }
}

export default DrawMap;
