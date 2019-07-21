import ymapsTouchScroll from 'ymaps-touch-scroll';

export default () => {
  let YaMapsShown = false;
  const yaMap = document.getElementById('ya-map');
  const yaMap2 = document.getElementById('ya-map2');

  // On scroll
  window.addEventListener('scroll', function() {
    const scrollBarPosition = window.pageYOffset | document.body.scrollTop;

    if ( !YaMapsShown ) {
      if ( yaMap ) {
        if ( scrollBarPosition > yaMap.offsetTop - window.innerHeight ) { 
          loadYaMaps();
          YaMapsShown = true;
        }
      }
      if ( yaMap2 ) {
        if ( scrollBarPosition > yaMap2.offsetTop - window.innerHeight ) {
          loadYaMaps();
          YaMapsShown = true;
        }
      }
    } 
  });

  // on Load dom
  setTimeout(() => {
    if ( yaMap ) {
      if ( yaMap.offsetTop <= window.innerHeight ) { 
        loadYaMaps();
        YaMapsShown = true;
      }
    }
    if ( yaMap2 ) {
      if ( yaMap.offsetTop <= window.innerHeight ) { 
        loadYaMaps();
        YaMapsShown = true;
      }
    }
  }, 2000);

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