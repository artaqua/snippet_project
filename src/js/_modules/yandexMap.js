import ymapsTouchScroll from 'ymaps-touch-scroll';

export default () => {
  const yaMap = document.getElementById('ya-map');
  const yaMap2 = document.getElementById('ya-map2');

  // On scroll
  document.addEventListener("DOMContentLoaded", () => {
    if ( yaMap ) {
      const waypoint = new Waypoint({
        element: yaMap,
        handler: function(direction) {
          if( direction === 'down' ) {
            loadYaMaps();
            // load once
            this.destroy();
          }
        },
        offset: '100%'
      });
    }
  });

  // // on Load dom
  // document.addEventListener("DOMContentLoaded", () => {
  //   if ( yaMap ) {
  //     setTimeout(() => {
  //       loadYaMaps();
  //     }, 2000);
  //   }
  // });

  // Load scripts
  function loadYaMaps() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//api-maps.yandex.ru/2.1/?apikey=331f0d07-e46d-4d29-8413-0bab3f422cd9&load=package.standard&lang=ru-RU&onload=initMap";
    document.body.appendChild(script);
  }

  // init
  function initMap(ymaps) {
    if ( yaMap ) {
      let map = new ymaps.Map("ya-map", {
        center: [55.9100, 37.6500],
        zoom: 13,
        controls: ['zoomControl', 'typeSelector', 'geolocationControl']
      },{
        autoFitToViewport: 'always'
      });
      ymapsTouchScroll(map);
    }
    if ( yaMap2 ) {
      let map2 = new ymaps.Map("ya-map2", {
        center: [55.9100, 37.6500],
        zoom: 13,
        controls: ['zoomControl', 'typeSelector', 'geolocationControl']
      },{
        autoFitToViewport: 'always'
      });
      ymapsTouchScroll(map2);
    }
  }

  window.initMap = initMap;
}