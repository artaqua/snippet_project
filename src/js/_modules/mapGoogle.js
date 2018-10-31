export function loadGoogleMapAsync() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(script);
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAPa6svYhFONG2AdEJ2F-4MhHwM764Pq_Q&callback=initMap';
}

// Map
function initMap() {
  var SnazzyInfoWindow = require('snazzy-info-window');
  // Map props
  var mapProp = {
    center: {
      lat: 50.3777,
      lng: 30.4224
    },
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,

    // Controls
    panControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: false,
    rotateControl: false,
    fullscreenControl: false,
    // Style map
    styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]

  };

  // Call Maps
  var callMaps = (function(){

    if ( $('#map-contacts').length ) {

      // Map-contacts
      mapProp.center = {
        lat: 50.3703,
        lng: 30.3895
      };
      var map = new google.maps.Map(document.getElementById('map-contacts'), mapProp);

      (function() {
        var dataMarkers = [
          {
            content: 'Test 1',
            lat: 50.4025,
            lng: 30.4137
          },
          {
            content: 'Test 2',
            lat: 50.3703,
            lng: 30.3895
          }
        ];
        var imageLocataion = {
          url: 'assets/img/markers/mark-location.png'
        };
        var imageLocataionActive = {
          url: 'assets/img/markers/mark-location-active.png',
          size: new google.maps.Size(60, 85),
          anchor: new google.maps.Point(30, 58)
        };
        var marker;
        var markers = [];
        var snazzyInfo;

        $.each(dataMarkers, function(i, elem) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(elem.lat, elem.lng),
            map: map,
            icon: imageLocataion
          });
          snazzyInfo = new SnazzyInfoWindow($.extend({}, {
            marker: marker,
            content: elem.content
          }));
          markers.push(marker);

          // On click
          (function(marker, i) {
            google.maps.event.addListener(marker, 'click', function() {
              markersSetDefault();
              marker.setIcon(imageLocataionActive);
            });
          })(marker, i);

          function markersSetDefault() {
            $.each(markers, function(i, elem) {
              elem.setIcon(imageLocataion);
            });
          }
        });

      })();
    } // end if

    if ( $('#map-road').length ) {

      // Map-road
      mapProp.zoom = 14;
      mapProp.center = {
        lat: 50.3743,
        lng: 30.3924
      };
      var map2 = new google.maps.Map(document.getElementById('map-road'), mapProp);

      (function() {
        // Mark logo
        var markLogo = new google.maps.Marker({
          position: {
            lat: 50.3743,
            lng: 30.3924
          },
          map: map2,
          icon: {
            url: 'assets/img/markers/mark-logo.png'
          }
        });

        // Road travel
        var markers = [];
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        directionsDisplay.setOptions({
          map: map2,
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: "#eb5c5d",
            strokeWeight: 4,
            strokeOpacity: 1
          }
        });

        google.maps.event.addListener(map2, 'click', function(e) {
          // Create marker
          var markerRoute = new google.maps.Marker({
            position: e.latLng, 
            map: map2,
            icon: 'assets/img/markers/mark-location.png'
          });

          markers.push(markerRoute);
          // Clear all markers
          markersClear(e.latLng);

          // Route drive
          calcRoute(e.latLng);
          
        });

        function markersClear(positionLastMarker) {
          $.each(markers, function(i, elem) {
            if (elem.position != positionLastMarker) {
              elem.setMap(null);
            }
          });
        }

        function calcRoute(endRoute) {
          var position = {
            start: {
              lat: 50.3743,
              lng: 30.3924
            },
            end: endRoute
          };
          var args = {
            origin: position.start,
            destination: position.end,
            travelMode: google.maps.TravelMode.DRIVING
          }
          directionsService.route(args, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            }
          });
        }
      })();

    } // end if

    if ( $('#map-infrastructure').length ) {

      // Map infrastructure
      mapProp.zoom = 14;
      mapProp.center = {
        lat: 50.3743,
        lng: 30.3924
      };
      var map3 = new google.maps.Map(document.getElementById('map-infrastructure'), mapProp);

      (function() {
        var dataMarkers = [
          {
            content: '<p class="title">Ресторан</p>',
            icon: 'assets/img/markers/mark-food.png',
            lat: 50.3743,
            lng: 30.4024
          },
          {
            content: '<p class="title">Футбольное поле</p>',
            icon: 'assets/img/markers/mark-footbol.png',
            lat: 50.3723,
            lng: 30.4000
          },
          {
            content: '<p class="title">Больница</p>',
            icon: 'assets/img/markers/mark-med.png',
            lat: 50.3680,
            lng: 30.3924
          },
          {
            content: '<p class="title">Кинотеатр</p>',
            icon: 'assets/img/markers/mark-movie.png',
            lat: 50.3800,
            lng: 30.3904
          },
          {
            content: '<p class="title">Школа</p>',
            icon: 'assets/img/markers/mark-school.png',
            lat: 50.3755,
            lng: 30.3804
          },
          {
            content: '<p class="title">Торговый центр</p>',
            icon: 'assets/img/markers/mark-shop.png',
            lat: 50.3710,
            lng: 30.3820
          }
        ];

        // Mark logo
        var markLogo = new google.maps.Marker({
          position: {
            lat: 50.3743,
            lng: 30.3924
          },
          map: map3,
          icon: {
            url: 'assets/img/markers/mark-logo.png'
          }
        });

        // Markers
        $.each(dataMarkers, function(i, elem) {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(elem.lat, elem.lng),
            map: map3,
            icon: elem.icon
          });
          var snazzyInfo = new SnazzyInfoWindow($.extend({}, {
            marker: marker,
            content: elem.content,
            showCloseButton: false
          }));

          // On mouse
          (function(marker, i) {
            google.maps.event.addListener(marker, 'mouseover', function() {
              snazzyInfo.setContent(elem.content);
              snazzyInfo.open();
            });
          })(marker, i);

          // Out mouse
          (function(marker, i) {
            google.maps.event.addListener(marker, 'mouseout', function() {
              snazzyInfo.setContent(elem.content);
              snazzyInfo.close();
            });
          })(marker, i);
        });

      })();

    } // end if

  })();

}

window.initMap = initMap;