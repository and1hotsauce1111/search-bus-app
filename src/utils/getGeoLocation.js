import "leaflet/dist/leaflet.css";
import L from "leaflet";
import userPosIcon from '../assets/mark/user-position.png'

const defaultPosition = [24.136944, 120.684722];

class DrawMap {
  constructor(position) {
    this.position = position || defaultPosition;
    this.map = L.map('map', {
      center: this.position,
      zoom: 18, // 0 - 18
      attributionControl: true,
      zoomControl: false
    });
    this.customIcon = L.icon({
      iconUrl: userPosIcon
    });
    this.marker = L.marker(this.position, {
      icon: this.customIcon
    }).addTo(this.map);
  }

  init() {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.getGeoInfo()
  }

  getGeoInfo() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.update(position)
      }, () => {
        alert('無法判斷當前位置，將導向預設地點');
        this.map.setView(defaultPosition, 18);
      });
    } else {
      alert("不支援GPS定位");
    }
  }

  update(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    this.marker.setLatLng({ lat, lng });
    this.map.panTo({ lat, lng });
  }
}

export default DrawMap;