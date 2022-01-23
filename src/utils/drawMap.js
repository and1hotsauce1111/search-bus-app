import 'leaflet/dist/leaflet.css';
import L, { marker } from 'leaflet';
import userPosIcon from '../assets/mark/user-position.png';
import busStopIcon from '../assets/mark/bus-stop.png';
import busIcon from '../assets/mark/BusPoint.png';
import bikeIconGreen from '../assets/mark/bike-green.png';
import bikeIconRed from '../assets/mark/bike-red.png';
import bikeIconGrey from '../assets/mark/bike-grey.png';
import mBikeIconGreen from '../assets/mark/bike-position-M-green.png';
import mBikeIconRed from '../assets/mark/bike-position-M-red.png';
import mBikeIconGrey from '../assets/mark/bike-position-M-grey.png';
import { wktToGeoJSON } from '@terraformer/wkt';
import { genBikeIconPopup } from '@/utils/genBikeIconPopup.js';
import { getDistance } from '@/utils/getDistance.js';

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

    this.bikeIconGreen = L.icon({ iconUrl: bikeIconGreen });

    this.bikeIconRed = L.icon({ iconUrl: bikeIconRed });

    this.bikeIconGrey = L.icon({ iconUrl: bikeIconGrey });

    this.mBikeIconGreen = L.icon({ iconUrl: mBikeIconGreen });

    this.mBikeIconRed = L.icon({ iconUrl: mBikeIconRed });

    this.mBikeIconGrey = L.icon({ iconUrl: mBikeIconGrey });

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

  drawBikeIcon(bikeInfo, innerWidth, userPosition) {
    if (!bikeInfo.length) return;

    this.removeLayer();

    let iconType = null;
    let html = '';
    let popUpContent = '';
    const popUpOptions = {
      closeButton: false,
      closeOnClick: true,
      className: 'm-bike-popup',
    };
    const userLatLng = {
      userLat: userPosition.lat,
      userLng: userPosition.lng,
    };

    for (let i = 0, len = bikeInfo.length; i < len; i++) {
      const stationPosition = {
        stationLat: bikeInfo[i].StationPosition.PositionLat,
        stationLng: bikeInfo[i].StationPosition.PositionLon,
      };
      const distance = getDistance(userLatLng, stationPosition, 'M');

      if (bikeInfo[i].Availability.AvailableRentBikes > 5) {
        if (innerWidth >= 640) {
          iconType = this.bikeIconGreen;
          html = `<span class="custom-div-icon text-primary-400">${bikeInfo[i].Availability.AvailableRentBikes}</span>`;
        } else {
          iconType = this.mBikeIconGreen;
          html = `<span class="m-custom-div-icon text-primary-400">${bikeInfo[i].Availability.AvailableRentBikes}</span>`;
        }
      }
      if (bikeInfo[i].Availability.AvailableRentBikes <= 5) {
        if (innerWidth >= 640) {
          iconType = this.bikeIconRed;
          html = `<span class="custom-div-icon text-alert-400">${bikeInfo[i].Availability.AvailableRentBikes}</span>`;
        } else {
          iconType = this.mBikeIconRed;
          html = `<span class="m-custom-div-icon text-alert-400">${bikeInfo[i].Availability.AvailableRentBikes}</span>`;
        }
      }
      if (bikeInfo[i].Availability.AvailableRentBikes === 0) {
        if (innerWidth >= 640) {
          iconType = this.bikeIconGrey;
          html = `<span class="custom-div-icon text-grey-400">${bikeInfo[i].Availability.AvailableRentBikes}</span>`;
        } else {
          iconType = this.mBikeIconGrey;
          html = `<span class="m-custom-div-icon text-grey-400">${bikeInfo[i].Availability.AvailableRentBikes}</span>`;
        }
      }

      popUpContent = genBikeIconPopup(
        bikeInfo[i].StationName.Zh_tw,
        bikeInfo[i].Availability.AvailableRentBikes,
        bikeInfo[i].Availability.AvailableReturnBikes,
        distance,
      );

      const divIcon = L.divIcon({
        iconSize: [38, 51],
        html,
      });

      const marker = new L.marker(
        {
          lat: bikeInfo[i].StationPosition.PositionLat,
          lng: bikeInfo[i].StationPosition.PositionLon,
        },
        {
          icon: iconType,
        },
      )
        .bindPopup(popUpContent, popUpOptions)
        .addTo(this.map);

      const divIconMarker = new L.marker(
        {
          lat: bikeInfo[i].StationPosition.PositionLat,
          lng: bikeInfo[i].StationPosition.PositionLon,
        },
        {
          icon: divIcon,
        },
      ).addTo(this.map);
    }

    // put useposition back
    this.updateUserPosition(userPosition);
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
