import ymapsTouchScroll from 'ymaps-touch-scroll';

export default () => {
  let YaMapsShown = false;
  window.addEventListener('scroll', function() {
    const scrollBarPosition = window.pageYOffset | document.body.scrollTop;
    if (!YaMapsShown) {
      if(scrollBarPosition > document.getElementById('ya-map').offsetTop - document.getElementById('ya-map').clientHeight ) { 
        loadYaMaps();
        YaMapsShown = true;
      }
    }

    function loadYaMaps() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "//api-maps.yandex.ru/2.1/?apikey=331f0d07-e46d-4d29-8413-0bab3f422cd9&load=package.standard&lang=ru-RU&onload=initMap";
      document.body.appendChild(script);
    }

    let map;
    const yaMap = document.getElementById('ya-map');
    const yaMap2 = document.getElementById('ya-map2');

    function initMap(ymaps) {
      if (typeof(yaMap) != 'undefined' && yaMap != null) {
        map = new ymaps.Map("ya-map", {
          center: [55.9100, 37.6500],
          zoom: 13,
          controls: ['zoomControl', 'typeSelector', 'geolocationControl']
        },{
          autoFitToViewport: 'always'
        });
        ymapsTouchScroll(map);
      }
      if (typeof(yaMap2) != 'undefined' && yaMap2 != null) {
        map = new ymaps.Map("ya-map2", {
          center: [55.9100, 37.6500],
          zoom: 13,
          controls: ['zoomControl', 'typeSelector', 'geolocationControl']
        },{
          autoFitToViewport: 'always'
        });
        ymapsTouchScroll(map);
      }
    }

    window.initMap = initMap;

  });
}