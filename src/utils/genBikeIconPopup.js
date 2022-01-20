export const genBikeIconPopup = function (stationName, rentCount, returnCount, distance) {
  if (rentCount === 'undefined' || returnCount === 'undefined') return '';

  console.log(rentCount, returnCount);

  let popupContent = '';

  if (rentCount > 5 && returnCount > 5) {
    // all green
    popupContent = `
      <p class="popup-title font-bold text-sm text-primary-500">${stationName}</p>
      <div class="popup-content flex justify-between items-center">
        <div class="rent-block flex items-center justify-between">
          <div class="rent flex items-center justify-between bg-primary-200 text-primary-500 py-1 px-3 mr-3 rounded">
            <i class="fas fa-bicycle mr-1"></i>
            <span class="text-sm">${rentCount}</span>
          </div>
          <div class="return flex items-center justify-between bg-primary-200 text-primary-500 py-1 px-3 rounded">
            <i class="fas fa-parking mr-1"></i>
            <span class="text-sm">${returnCount}</span>
          </div>
        </div>
        <div class="distance flex items-center justify-between">
          <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
          <span class="text-grey-500 text-xm">距離${distance}公尺</span>
        </div>
      </div>
    `;
  }

  if (
    rentCount <= 5 &&
    returnCount !== 0 &&
    rentCount <= 5 &&
    returnCount !== 0
  ) {
    // all red
    popupContent = `
      <p class="popup-title font-bold text-sm text-primary-500">${stationName}</p>
      <div class="popup-content flex justify-between items-center">
        <div class="rent-block flex items-center justify-between">
          <div class="rent flex items-center justify-between bg-alert-200 text-alert-600 py-1 px-3 mr-3 rounded">
            <i class="fas fa-bicycle mr-1"></i>
            <span class="text-sm">${rentCount}</span>
          </div>
          <div class="return flex items-center justify-between bg-alert-200 text-alert-600 py-1 px-3 rounded">
            <i class="fas fa-parking mr-1"></i>
            <span class="text-sm">${returnCount}</span>
          </div>
        </div>
        <div class="distance flex items-center justify-between">
          <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
          <span class="text-grey-500 text-xm">距離${distance}公尺</span>
        </div>
      </div>
    `;
  }

  if (rentCount === 0 && returnCount === 0) {
    // all grey
    popupContent = `
      <p class="popup-title font-bold text-sm text-primary-500">${stationName}</p>
      <div class="popup-content flex justify-between items-center">
        <div class="rent-block flex items-center justify-between">
          <div class="rent flex items-center justify-between bg-grey-200 text-grey-300 py-1 px-3 mr-3 rounded">
            <i class="fas fa-bicycle mr-1"></i>
            <span class="text-sm">${rentCount}</span>
          </div>
          <div class="return flex items-center justify-between bg-grey-200 text-grey-300 py-1 px-3 rounded">
            <i class="fas fa-parking mr-1"></i>
            <span class="text-sm">${returnCount}</span>
          </div>
        </div>
        <div class="distance flex items-center justify-between">
          <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
          <span class="text-grey-500 text-xm">距離${distance}公尺</span>
        </div>
      </div>
    `;
  }

  if (rentCount > 5 && returnCount < 5 && returnCount !== 0) {
    // rent green, return red
    popupContent = `
      <p class="popup-title font-bold text-sm text-primary-500">${stationName}</p>
      <div class="popup-content flex justify-between items-center">
        <div class="rent-block flex items-center justify-between">
          <div class="rent flex items-center justify-between bg-primary-200 text-primary-500 py-1 px-3 mr-3 rounded">
            <i class="fas fa-bicycle mr-1"></i>
            <span class="text-sm">${rentCount}</span>
          </div>
          <div class="return flex items-center justify-between bg-alert-200 text-alert-600 py-1 px-3 rounded">
            <i class="fas fa-parking mr-1"></i>
            <span class="text-sm">${returnCount}</span>
          </div>
        </div>
        <div class="distance flex items-center justify-between">
          <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
          <span class="text-grey-500 text-xm">距離${distance}公尺</span>
        </div>
      </div>
    `;
  }

  if (rentCount > 5 && returnCount === 0) {
    // rent green, return grey
    popupContent = `
      <p class="popup-title font-bold text-sm text-primary-500">${stationName}</p>
      <div class="popup-content flex justify-between items-center">
        <div class="rent-block flex items-center justify-between">
          <div class="rent flex items-center justify-between bg-primary-200 text-primary-500 py-1 px-3 mr-3 rounded">
            <i class="fas fa-bicycle mr-1"></i>
            <span class="text-sm">${rentCount}</span>
          </div>
          <div class="return flex items-center justify-between bg-grey-200 text-grey-300 py-1 px-3 rounded">
            <i class="fas fa-parking mr-1"></i>
            <span class="text-sm">${returnCount}</span>
          </div>
        </div>
        <div class="distance flex items-center justify-between">
          <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
          <span class="text-grey-500 text-xm">距離${distance}公尺</span>
        </div>
      </div>
    `;
  }

  if (rentCount < 5 && rentCount !== 0 && returnCount > 5) {
    // rent red, return green
    popupContent = `
      <p class="popup-title font-bold text-sm text-primary-500">${stationName}</p>
      <div class="popup-content flex justify-between items-center">
        <div class="rent-block flex items-center justify-between">
          <div class="rent flex items-center justify-between bg-alert-200 text-alert-600 py-1 px-3 mr-3 rounded">
            <i class="fas fa-bicycle mr-1"></i>
            <span class="text-sm">${rentCount}</span>
          </div>
          <div class="return flex items-center justify-between bg-primary-200 text-primary-500 py-1 px-3 rounded">
            <i class="fas fa-parking mr-1"></i>
            <span class="text-sm">${returnCount}</span>
          </div>
        </div>
        <div class="distance flex items-center justify-between">
          <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
          <span class="text-grey-500 text-xm">距離${distance}公尺</span>
        </div>
      </div>
    `;
  }

  if (rentCount < 5 && rentCount !== 0 && returnCount === 0) {
    // rent red, return grey
    popupContent = `
      <p class="popup-title font-bold text-sm text-primary-500">${stationName}</p>
      <div class="popup-content flex justify-between items-center">
        <div class="rent-block flex items-center justify-between">
          <div class="rent flex items-center justify-between bg-alert-200 text-alert-600 py-1 px-3 mr-3 rounded">
            <i class="fas fa-bicycle mr-1"></i>
            <span class="text-sm">${rentCount}</span>
          </div>
          <div class="return flex items-center justify-between bg-grey-200 text-grey-300 py-1 px-3 rounded">
            <i class="fas fa-parking mr-1"></i>
            <span class="text-sm">${returnCount}</span>
          </div>
        </div>
        <div class="distance flex items-center justify-between">
          <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
          <span class="text-grey-500 text-xm">距離${distance}公尺</span>
        </div>
      </div>
    `;
  }

  if (rentCount === 0 && returnCount < 5 && returnCount !== 0) {
    // rent grey, return red
    popupContent = `
      <p class="popup-title font-bold text-sm text-primary-500">${stationName}</p>
      <div class="popup-content flex justify-between items-center">
        <div class="rent-block flex items-center justify-between">
          <div class="rent flex items-center justify-between bg-grey-200 text-grey-300 py-1 px-3 mr-3 rounded">
            <i class="fas fa-bicycle mr-1"></i>
            <span class="text-sm">${rentCount}</span>
          </div>
          <div class="return flex items-center justify-between bg-alert-200 text-alert-600 py-1 px-3 rounded">
            <i class="fas fa-parking mr-1"></i>
            <span class="text-sm">${returnCount}</span>
          </div>
        </div>
        <div class="distance flex items-center justify-between">
          <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
          <span class="text-grey-500 text-xm">距離${distance}公尺</span>
        </div>
      </div>
    `;
  }

  if (rentCount === 0 && returnCount > 5) {
    console.log('in');
    // rent grey, return green
    popupContent = `
      <p class="popup-title font-bold text-sm text-primary-500">${stationName}</p>
      <div class="popup-content flex justify-between items-center">
        <div class="rent-block flex items-center justify-between">
          <div class="rent flex items-center justify-between bg-grey-200 text-grey-300 py-1 px-3 mr-3 rounded">
            <i class="fas fa-bicycle mr-1"></i>
            <span class="text-sm">${rentCount}</span>
          </div>
          <div class="return flex items-center justify-between bg-primary-200 text-primary-500 py-1 px-3 rounded">
            <i class="fas fa-parking mr-1"></i>
            <span class="text-sm">${returnCount}</span>
          </div>
        </div>
        <div class="distance flex items-center justify-between">
          <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
          <span class="text-grey-500 text-xm">距離${distance}公尺</span>
        </div>
      </div>
    `;
  }

  return popupContent;
};
