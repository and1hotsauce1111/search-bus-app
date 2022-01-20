export const genBikeIconPopup = function (rentCount, returnCount) {
  if (!rentCount || !returnCount) return '';

  let popupContent = '';

  if (rentCount > 5 && returnCount > 5) {
    // all green
    popupContent = `
      <div class="m-bike-popup">
        <p class="popup-title"></p>
        <div class="popup-content">
          <div class="rent-block flex items-center justify-between">
            <div class="rent flex items-center justify-between bg-primary-200 text-primary-500">
              <i class="fas fa-bicycle mr-1"></i>
              <span class="text-sm">24</span>
            </div>
            <div class="return flex items-center justify-between bg-primary-200 text-primary-500">
              <i class="fas fa-parking mr-1"></i>
              <span class="text-sm">25</span>
            </div>
          </div>
          <div class="distance flex items-center justify-between">
            <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
            <span class="text-grey-500 text-xm">距離25公尺</span>
          </div>
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
      <div class="m-bike-popup">
        <p class="popup-title"></p>
        <div class="popup-content">
          <div class="rent-block flex items-center justify-between">
            <div class="rent flex items-center justify-between bg-alert-200 text-alert-600">
              <i class="fas fa-bicycle mr-1"></i>
              <span class="text-sm">24</span>
            </div>
            <div class="return flex items-center justify-between bg-alert-200 text-alert-600">
              <i class="fas fa-parking mr-1"></i>
              <span class="text-sm">25</span>
            </div>
          </div>
          <div class="distance flex items-center justify-between">
            <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
            <span class="text-grey-500 text-xm">距離25公尺</span>
          </div>
        </div>
      </div>
    `;
  }

  if (rentCount === 0 && returnCount === 0) {
    // all grey
    popupContent = `
      <div class="m-bike-popup">
        <p class="popup-title"></p>
        <div class="popup-content">
          <div class="rent-block flex items-center justify-between">
            <div class="rent flex items-center justify-between bg-grey-200 text-grey-300">
              <i class="fas fa-bicycle mr-1"></i>
              <span class="text-sm">24</span>
            </div>
            <div class="return flex items-center justify-between bg-grey-200 text-grey-300">
              <i class="fas fa-parking mr-1"></i>
              <span class="text-sm">25</span>
            </div>
          </div>
          <div class="distance flex items-center justify-between">
            <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
            <span class="text-grey-500 text-xm">距離25公尺</span>
          </div>
        </div>
      </div>
    `;
  }

  if (rentCount > 5 && returnCount < 5 && returnCount !== 0) {
    // rent green, return red
    popupContent = `
      <div class="m-bike-popup">
        <p class="popup-title"></p>
        <div class="popup-content">
          <div class="rent-block flex items-center justify-between">
            <div class="rent flex items-center justify-between bg-primary-200 text-primary-500">
              <i class="fas fa-bicycle mr-1"></i>
              <span class="text-sm">24</span>
            </div>
            <div class="return flex items-center justify-between bg-alert-200 text-alert-600">
              <i class="fas fa-parking mr-1"></i>
              <span class="text-sm">25</span>
            </div>
          </div>
          <div class="distance flex items-center justify-between">
            <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
            <span class="text-grey-500 text-xm">距離25公尺</span>
          </div>
        </div>
      </div>
    `;
  }

  if (rentCount > 5 && returnCount === 0) {
    // rent green, return grey
    popupContent = `
      <div class="m-bike-popup">
        <p class="popup-title"></p>
        <div class="popup-content">
          <div class="rent-block flex items-center justify-between">
            <div class="rent flex items-center justify-between bg-primary-200 text-primary-500">
              <i class="fas fa-bicycle mr-1"></i>
              <span class="text-sm">24</span>
            </div>
            <div class="return flex items-center justify-between bg-grey-200 text-grey-300">
              <i class="fas fa-parking mr-1"></i>
              <span class="text-sm">25</span>
            </div>
          </div>
          <div class="distance flex items-center justify-between">
            <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
            <span class="text-grey-500 text-xm">距離25公尺</span>
          </div>
        </div>
      </div>
    `;
  }

  if (rentCount < 5 && rentCount !== 0 && returnCount > 5) {
    // rent red, return green
    popupContent = `
      <div class="m-bike-popup">
        <p class="popup-title"></p>
        <div class="popup-content">
          <div class="rent-block flex items-center justify-between">
            <div class="rent flex items-center justify-between bg-alert-200 text-alert-600">
              <i class="fas fa-bicycle mr-1"></i>
              <span class="text-sm">24</span>
            </div>
            <div class="return flex items-center justify-between bg-primary-200 text-primary-500">
              <i class="fas fa-parking mr-1"></i>
              <span class="text-sm">25</span>
            </div>
          </div>
          <div class="distance flex items-center justify-between">
            <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
            <span class="text-grey-500 text-xm">距離25公尺</span>
          </div>
        </div>
      </div>
    `;
  }

  if (rentCount < 5 && rentCount !== 0 && returnCount === 0) {
    // rent red, return grey
    popupContent = `
      <div class="m-bike-popup">
        <p class="popup-title"></p>
        <div class="popup-content">
          <div class="rent-block flex items-center justify-between">
            <div class="rent flex items-center justify-between bg-alert-200 text-alert-600">
              <i class="fas fa-bicycle mr-1"></i>
              <span class="text-sm">24</span>
            </div>
            <div class="return flex items-center justify-between bg-grey-200 text-grey-300">
              <i class="fas fa-parking mr-1"></i>
              <span class="text-sm">25</span>
            </div>
          </div>
          <div class="distance flex items-center justify-between">
            <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
            <span class="text-grey-500 text-xm">距離25公尺</span>
          </div>
        </div>
      </div>
    `;
  }

  if (rentCount === 0 && returnCount < 5 && returnCount !== 0) {
    // rent grey, return red
    popupContent = `
      <div class="m-bike-popup">
        <p class="popup-title"></p>
        <div class="popup-content">
          <div class="rent-block flex items-center justify-between">
            <div class="rent flex items-center justify-between bg-grey-200 text-grey-300">
              <i class="fas fa-bicycle mr-1"></i>
              <span class="text-sm">24</span>
            </div>
            <div class="return flex items-center justify-between bg-alert-200 text-alert-600">
              <i class="fas fa-parking mr-1"></i>
              <span class="text-sm">25</span>
            </div>
          </div>
          <div class="distance flex items-center justify-between">
            <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
            <span class="text-grey-500 text-xm">距離25公尺</span>
          </div>
        </div>
      </div>
    `;
  }

  if (rentCount === 0 && returnCount > 5) {
    // rent grey, return green
    popupContent = `
      <div class="m-bike-popup">
        <p class="popup-title"></p>
        <div class="popup-content">
          <div class="rent-block flex items-center justify-between">
            <div class="rent flex items-center justify-between bg-grey-200 text-grey-300">
              <i class="fas fa-bicycle mr-1"></i>
              <span class="text-sm">24</span>
            </div>
            <div class="return flex items-center justify-between bg-primary-200 text-primary-500">
              <i class="fas fa-parking mr-1"></i>
              <span class="text-sm">25</span>
            </div>
          </div>
          <div class="distance flex items-center justify-between">
            <i class="fas fa-map-marker-alt text-grey-500 mr-1.5"></i>
            <span class="text-grey-500 text-xm">距離25公尺</span>
          </div>
        </div>
      </div>
    `;
  }

  return popupContent;
};
