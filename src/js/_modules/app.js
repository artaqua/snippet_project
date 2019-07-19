;'use strict';

import LazyLoad from 'vanilla-lazyload';
import Swiper from 'swiper';
import 'lightgallery.js';
import ymapsTouchScroll from 'ymaps-touch-scroll';
import { 
  toggleScroll,
  hasClass,
} from './functions.js';

// Lazy load
let lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy"
});

// APP
// Event DOM Ready
document.addEventListener("DOMContentLoaded", () => {

  // Menu
  const btnMenu = document.querySelector('.btn-menu');
  if (btnMenu) {
    btnMenu.addEventListener('click', (event) => {
      event.preventDefault();
      const sidebarMenu = document.querySelector('.sidebar-menu');
      if ( !hasClass(btnMenu, 'btn-menu_active') ) {
        btnMenu.classList.add('btn-menu_active')
        sidebarMenu.classList.add('sidebar-menu_active');
        toggleScroll('hide');
      } else {
        btnMenu.classList.remove('btn-menu_active')
        sidebarMenu.classList.remove('sidebar-menu_active');
        toggleScroll('show');
      }
    }, false);
  }

  const SidebarClose = document.querySelector('.sidebar-menu__close');
  if (SidebarClose) {
    SidebarClose.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('.btn-menu').classList.remove('btn-menu_active');
      document.querySelector('.sidebar-menu').classList.remove('sidebar-menu_active');
      toggleScroll('show');
    }, false);
  }

  document.addEventListener('keydown', (event) => {
    if (event.keyCode == 27) {
      event.preventDefault();
      document.querySelector('.btn-menu').classList.remove('btn-menu_active');
      document.querySelector('.sidebar-menu').classList.remove('sidebar-menu_active');
      document.querySelector('.popup-helpers').classList.remove('popup-helpers_active');
      toggleScroll('show');
    }
  }, false);

  // Dropdown
  (function (argument) {
    // Open/hide
    const dropdownLink = document.querySelector('.dropdown__link');
    if (dropdownLink) {
      dropdownLink.addEventListener('click', (event) => {
        event.preventDefault();
        const el = event.currentTarget;
        const dropdown = el.parentNode;

        if ( !hasClass(dropdown, 'dropdown_active') ) {
          dropdown.classList.add('dropdown_active');
        } else {
          dropdown.classList.remove('dropdown_active');
        }
      }, false);
    }

    const dropdowns = document.querySelectorAll('.dropdown');
    if (dropdowns) {
      dropdowns.forEach(dropdown => {
        document.addEventListener('click', (event) => {
          if ( !dropdown.contains(event.target) ) {
            dropdown.classList.remove('dropdown_active');
          }
        }, false);
      }, false);
    }

    // Change inputs
    const optsInput = document.querySelectorAll('.dropdown .opts__input');
    if (optsInput) {
      let textLink;

      for (var i = 0; i < optsInput.length; i++) {
        optsInput[i].addEventListener('change', somethingChanged);
      }

      function somethingChanged(evt) {
        textLink = [];

        for(var i=0; i<optsInput.length; i++) {
          if ( optsInput[i].checked == true ) {
            const textChangeElem = optsInput[i].nextElementSibling.textContent;

            if ( textLink.length > 0 ) {
              textLink.push(' ' + textChangeElem);
            } else {
              textLink.push(textChangeElem);
            }
          }
        }
        dropdownLink.querySelector('.dropdown__link-text').textContent = textLink;

        if (dropdownLink.querySelector('.dropdown__link-text').textContent.length == '') {
          dropdownLink.querySelector('.dropdown__link-text').textContent = 'Выберите планировку';
        }
      }
    }
  })();

  // Filter price
  const inputPriceFrom = document.querySelector('.filter-price__input_from');
  if (inputPriceFrom) {
    inputPriceFrom.addEventListener('focus', (event) => {
      const target = event.currentTarget;
      target.setAttribute('placeholder', '');
      event.currentTarget.value = 'от ';
    }, false);
    inputPriceFrom.addEventListener('blur', (event) => {
      const target = event.currentTarget;
      target.setAttribute('placeholder', 'Цена от');
    }, false);
    inputPriceFrom.addEventListener('keyup', (event) => {
      // Only numbers keyup
      if(event.which >= 37 && event.which <= 40) return;
      // Convert numbers
      let value = event.currentTarget.value;

      event.currentTarget.value = 'от ' + value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }, false);
  }
  const inputPriceTo = document.querySelector('.filter-price__input_to');
  if (inputPriceTo) {
    inputPriceTo.addEventListener('focus', (event) => {
      const target = event.currentTarget;
      target.setAttribute('placeholder', '');
      event.currentTarget.value = 'до ';
    }, false);
    inputPriceTo.addEventListener('blur', (event) => {
      const target = event.currentTarget;
      target.setAttribute('placeholder', 'Цена до');
    }, false);
    inputPriceTo.addEventListener('keyup', (event) => {
      // Only numbers keyup
      if(event.which >= 37 && event.which <= 40) return;
      // Convert numbers
      let value = event.currentTarget.value;

      event.currentTarget.value = 'до ' + value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }, false);
  }

  // Filter search
  const filterSearch = document.querySelector('.filter-search__input');
  if (filterSearch) {
    filterSearch.addEventListener('blur', (event) => {
      event.preventDefault();
      document.querySelector('.filter-search').classList.remove('filter-search_active');

      if ( event.currentTarget.value.length > 0 ) {
        document.querySelector('.filter-search').classList.add('filter-search_hide-placeholder');
      } else {
        document.querySelector('.filter-search').classList.remove('filter-search_hide-placeholder');
      }
    }, false);

    filterSearch.addEventListener('focus', (event) => {
      event.preventDefault();
      document.querySelector('.filter-search').classList.add('filter-search_active');
      document.querySelector('.filter-search').classList.remove('filter-search_hide-placeholder');
    }, false);
  }

  // Показать еще
  const linkMoreList = document.querySelectorAll('.list-offer__show-more');
  if (linkMoreList) {
    linkMoreList.forEach(block => {
      block.addEventListener('click', (event) => {
        event.preventDefault();
        const listParent = event.currentTarget.closest('.list-offer');

        listParent.classList.toggle('list-offer_active');

        if ( hasClass(listParent, 'list-offer_active') ) {
          event.currentTarget.textContent = 'Свернуть';
        } else {
          event.currentTarget.textContent = 'Показать еще';
        }
      }, false);
    }, false);
  }
  const linkMoreListNewsBlog = document.querySelectorAll('.list-news-blog__show-more');
  if (linkMoreListNewsBlog) {
    linkMoreListNewsBlog.forEach(block => {
      block.addEventListener('click', (event) => {
        event.preventDefault();
        const listParent = event.currentTarget.closest('.list-news-blog');

        listParent.classList.toggle('list-news-blog_active');

        if ( hasClass(listParent, 'list-news-blog_active') ) {
          event.currentTarget.textContent = 'Свернуть';
        } else {
          event.currentTarget.textContent = 'Показать еще';
        }
      }, false);
    }, false);
  }

  const linkMoreListRegions = document.querySelectorAll('.list-regions__show-more');
  if (linkMoreListRegions) {
    linkMoreListRegions.forEach(block => {
      block.addEventListener('click', (event) => {
        event.preventDefault();
        const listParent = event.currentTarget.closest('.list-regions');

        listParent.classList.toggle('list-regions_active');
        
        if ( hasClass(listParent, 'list-regions_active') ) {
          event.currentTarget.querySelector('.list-regions__show-more-text').textContent = 'Свернуть';
        } else {
          event.currentTarget.querySelector('.list-regions__show-more-text').textContent = 'Показать еще';
        }
      }, false);
    }, false);
  }

  // Location
  const locationInputs = document.querySelectorAll('.location');
  if (locationInputs) {
    document.querySelectorAll('.location__toggle').forEach(block => {
      block.addEventListener('click', (event) => {
        const location = event.currentTarget.closest('.location');
        const inputLeft = location.querySelector('.location__field_left').querySelector('.location__input');
        const inputRight = location.querySelector('.location__field_right').querySelector('.location__input');
        if ( hasClass(location, 'location_active') ) {
          inputLeft.checked = true;
          location.classList.remove('location_active');
        } else {
          inputRight.checked = true;
          location.classList.add('location_active');
        }
      }, false);
    }, false);
    document.querySelectorAll('.location__field').forEach(block => {
      block.addEventListener('click', (event) => {
        const locationField = event.currentTarget;
        if ( hasClass(locationField, 'location__field_left') ) {
          locationField.closest('.location').classList.remove('location_active');
        } else {
          locationField.closest('.location').classList.add('location_active');
        }
      }, false);
    }, false);
  }

  // Read more about
  const readMoreAbout = document.querySelector('.about-info__read-more');
  if (readMoreAbout) {
    readMoreAbout.addEventListener('click', (event) => {
      event.preventDefault();
      const aboutInfo = event.currentTarget.closest('.about-info');
      aboutInfo.classList.toggle('about-info_active');
      if ( hasClass(aboutInfo, 'about-info_active') ) {
        event.currentTarget.textContent = 'Свернуть';
      } else {
        event.currentTarget.textContent = 'Показать все';
      }
    }, false);
  }

  // Show more specials
  const linkMoreListSpecials = document.querySelector('.list-specials__show-more');
  if (linkMoreListSpecials) {
    linkMoreListSpecials.addEventListener('click', (event) => {
      event.preventDefault();
      const listParent = event.currentTarget.closest('.list-specials');

      listParent.classList.toggle('list-specials_active');
      
      if ( hasClass(listParent, 'list-specials_active') ) {
        event.currentTarget.textContent = 'Свернуть';
      } else {
        event.currentTarget.textContent = 'Показать еще';
      }
    }, false);
  }

  // Swipe icons
  const swipeBlocks = document.querySelectorAll('.buildings__scroll');
  if (swipeBlocks) {
    swipeBlocks.forEach(block => {
      block.addEventListener('scroll', (event) => {
        event.preventDefault();
        block.querySelector('.swipe-icon').classList.add('swipe-icon_hide');
      }, false);
    }, false);
  }

  // Tabs
  (function () {
    const tabs = document.querySelectorAll('.tab');
    if (tabs) {
      tabs.forEach(tab => {
        const dataTab = tab.querySelector('.tab__link_active').getAttribute('data-tab');
        const contentItems = tab.querySelectorAll('.tab__content-item');
        const tabLinks = tab.querySelectorAll('.tab__link');

        // Init
        contentItems.forEach(block => {
          block.classList.remove('tab__content-item_active');
        }, false);
        tab.querySelector(dataTab).classList.add('tab__content-item_active');

        // Change tab
        tabLinks.forEach(link => {
          link.addEventListener('click', (event) => {
            event.preventDefault();
            const clickedLink = event.currentTarget;
            const clickedLinkData = clickedLink.getAttribute('data-tab');

            tabLinks.forEach(link => {
              link.classList.remove('tab__link_active');
            }, false);
            clickedLink.classList.add('tab__link_active');

            contentItems.forEach(item => {
              item.classList.remove('tab__content-item_active');
            }, false);
            tab.querySelector(clickedLinkData).classList.add('tab__content-item_active');

          }, false);
        }, false);
      }, false);
    }
  })();

  // Popup
  let myMap;
  const popupOpenLinks = document.querySelectorAll('.filter-search__helpers-item');
  if (popupOpenLinks) {
    popupOpenLinks.forEach(block => {
      block.addEventListener('click', (event) => {
        event.preventDefault();
        const popup = document.querySelector('.popup-helpers');
        const dataTabLink = Number(event.currentTarget.getAttribute('data-tab-link'));
        const contentItems = popup.querySelectorAll('.tab__content-item');
        const tabLinks = popup.querySelectorAll('.tab__link');
        let activeTabContent;

        // Open popup
        popup.classList.add('popup-helpers_active');
        toggleScroll('hide');

        // change link active
        tabLinks.forEach((link, index) => {
          if (index == dataTabLink) {
            link.classList.add('tab__link_active');
            activeTabContent = link.getAttribute('data-tab');
          } else {
            link.classList.remove('tab__link_active');
          }
        }, false);

        // Change content active
        contentItems.forEach(block => {
          block.classList.remove('tab__content-item_active');
        }, false);
        popup.querySelector(activeTabContent).classList.add('tab__content-item_active');

      }, false);
    }, false);
  }

  // Popup close
  const popupCloseLink = document.querySelector('.popup-helpers__close');
  if (popupCloseLink) {
    popupCloseLink.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('.popup-helpers').classList.remove('popup-helpers_active');
      toggleScroll('show');
    }, false);
  }

  // about block hide/show
  const descrBlocks = document.querySelectorAll('.descr-block');
  if (descrBlocks) {
    descrBlocks.forEach(block => {
      block.querySelector('.descr-block__read-more').addEventListener('click', (event) => {
        event.preventDefault();
        block.classList.toggle('descr-block_active');
      
        if ( hasClass(block, 'descr-block_active') ) {
          event.currentTarget.textContent = 'Свернуть';
        } else {
          event.currentTarget.textContent = 'Показать еще';
        }
      }, false);
    }, false);
  }

  // Show more companies
  const linkMoreListCompanies = document.querySelector('.list-companies__show-more');
  if (linkMoreListCompanies) {
    linkMoreListCompanies.addEventListener('click', (event) => {
      event.preventDefault();
      const listParent = event.currentTarget.closest('.list-companies');

      listParent.classList.toggle('list-companies_active');
      
      if ( hasClass(listParent, 'list-companies_active') ) {
        event.currentTarget.textContent = 'Свернуть';
      } else {
        event.currentTarget.textContent = 'Показать еще';
      }
    }, false);
  }

  // Filter price map
  const inputPriceFromMap = document.querySelector('.filter-price-map__input_from');
  if (inputPriceFromMap) {
    inputPriceFromMap.addEventListener('focus', (event) => {
      const target = event.currentTarget;
      target.setAttribute('placeholder', '');
      event.currentTarget.value = 'от ';
    }, false);
    inputPriceFromMap.addEventListener('blur', (event) => {
      const target = event.currentTarget;
      target.setAttribute('placeholder', 'Цена от');
    }, false);
    inputPriceFromMap.addEventListener('keyup', (event) => {
      // Only numbers keyup
      if(event.which >= 37 && event.which <= 40) return;
      // Convert numbers
      let value = event.currentTarget.value;

      event.currentTarget.value = 'от ' + value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }, false);
  }
  const inputPriceToMap = document.querySelector('.filter-price-map__input_to');
  if (inputPriceToMap) {
    inputPriceToMap.addEventListener('focus', (event) => {
      const target = event.currentTarget;
      target.setAttribute('placeholder', '');
      event.currentTarget.value = 'до ';
    }, false);
    inputPriceToMap.addEventListener('blur', (event) => {
      const target = event.currentTarget;
      target.setAttribute('placeholder', 'Цена до');
    }, false);
    inputPriceToMap.addEventListener('keyup', (event) => {
      // Only numbers keyup
      if(event.which >= 37 && event.which <= 40) return;
      // Convert numbers
      let value = event.currentTarget.value;

      event.currentTarget.value = 'до ' + value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' руб.';
    }, false);
  }

  (function () {
    // Open/hide
    const dropdownSelectsLink = document.querySelectorAll('.dropdown-select__link');
    if (dropdownSelectsLink) {
      dropdownSelectsLink.forEach(link => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          const el = event.currentTarget;
          const dropdown = el.closest('.dropdown-select');

          if ( !hasClass(dropdown, 'dropdown-select_active') ) {
            dropdown.classList.add('dropdown-select_active');
          } else {
            dropdown.classList.remove('dropdown-select_active');
          }
        }, false);
      }, false);
    }

    const dropdownsSelect = document.querySelectorAll('.dropdown-select');
    if (dropdownsSelect) {
      dropdownsSelect.forEach(dropdown => {
        document.addEventListener('click', (event) => {
          if ( !dropdown.contains(event.target) ) {
            dropdown.classList.remove('dropdown-select_active');
          }
        }, false);
      }, false);
    }
  })();

  // Init complex
  let map;
  const mapComplex = document.getElementById('complex-map');
  const mapGk = document.getElementById('gk-map');
  if (typeof(mapComplex) != 'undefined' && mapComplex != null) {
    ymaps.ready(initMap);

    function initMap() {
      map = new ymaps.Map("complex-map", {
        center: [55.9100, 37.6500],
        zoom: 13,
        controls: ['zoomControl', 'typeSelector', 'geolocationControl']
      },{
        autoFitToViewport: 'always'
      });
     

      const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        // '<div class="marker">$[properties.iconContent]</div>'
        '<div class="marker"><div class="marker__circle"><img class="marker__icon" src="assets/img/markers/marker-complex.png" alt="" /></div><span class="marker__text">$[properties.iconContent]</span></div>'
      );
      const myPlacemarkWithContent = new ymaps.Placemark([55.9100, 37.6500], {
        iconContent: 'от 20.7 млн',
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#imageWithContent',
        // Размеры метки.
        iconImageSize: [100, 22],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-50, -11],
        // Смещение слоя с содержимым относительно слоя с картинкой.
        iconContentOffset: [0, 0],
        // Макет содержимого.
        iconContentLayout: MyIconContentLayout
      });
      map.geoObjects.add(myPlacemarkWithContent);

      // Click
      myPlacemarkWithContent.events.add("click", function (e) {
        document.querySelector('.map').classList.add('map_open');
        map.container.fitToViewport();
      });


      ymapsTouchScroll(map);
    }
  }

  if (typeof(mapGk) != 'undefined' && mapGk != null) {
    ymaps.ready(initMap);

    function initMap() {
      map = new ymaps.Map("gk-map", {
        center: [55.9100, 37.6500],
        zoom: 13,
        controls: ['zoomControl', 'typeSelector', 'geolocationControl']
      },{
        autoFitToViewport: 'always'
      });

      var placemark = new ymaps.Placemark([55.9100, 37.6500]);
      // Добавление метки на карту
      map.geoObjects.add(placemark);


      ymapsTouchScroll(map);
    }
  }

  // Close info map 
  const linkCloseInfoMap = document.querySelector('.list-offer__close');
  if (linkCloseInfoMap) {
    linkCloseInfoMap.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('.map').classList.remove('map_open');
      map.container.fitToViewport();
    }, false);
  }

  // Show full phone
  const connectionPhones = document.querySelectorAll('.js-phone-connection');
  if (connectionPhones) {
    connectionPhones.forEach(phone => {
      phone.addEventListener('click', (event) => {
        event.preventDefault();
        const elem = event.currentTarget.querySelector('.connection__phone');
        const phoneData = elem.getAttribute('data-phone');

        elem.textContent = phoneData;
      }, false);
    }, false);
  }

  // Переключатель отделки
  const facingInputs = document.querySelectorAll('.facing__input');
  if (facingInputs) {
    facingInputs.forEach(block => {
      block.addEventListener('change', (event) => {
        document.querySelector('.facing__toggle').classList.toggle('facing__toggle_active');
      }, false);
    }, false);
  }
  const facingToggle = document.querySelectorAll('.facing__toggle');
  if (facingToggle) {
    facingToggle.forEach(block => {
      block.addEventListener('click', (event) => {
        event.preventDefault();
        const elem = event.currentTarget;
        const facingOff = document.getElementById('facing-off');
        const facingOn = document.getElementById('facing-on');

        elem.classList.toggle('facing__toggle_active');
        if ( facingOff.checked ) {
          console.log('test');
          facingOn.checked = true;
        } else if ( facingOn.checked ) {
          facingOff.checked = true;
        }
      }, false);
    }, false);
  }

  // Swipe icons
  const scrollTable = document.querySelectorAll('.rooms-opts__scroll, .time-metro__scroll, .dinamic-build__scroll, .table-banks__scroll-table');
  if (scrollTable) {
    scrollTable.forEach(block => {
      block.addEventListener('scroll', (event) => {
        event.currentTarget.previousElementSibling.classList.add('swipe-icon_hide');
      }, false);
    }, false);
  }

  // Tooltips facing
  const tooltipFacing = document.querySelectorAll('.tooltip-facing__link');
  if (tooltipFacing) {
    tooltipFacing.forEach(block => {
      block.addEventListener('click', (event) => {
        event.preventDefault();
        const elem = document.querySelector('.tooltip-facing__content');
        elem.classList.toggle('tooltip-facing__content_active');
      }, false);
    }, false);
  }



  // Show more companies
  const linkMoreListCardCompany = document.querySelector('.list-card-company__show-more');
  if (linkMoreListCardCompany) {
    linkMoreListCardCompany.addEventListener('click', (event) => {
      event.preventDefault();
      const listParent = event.currentTarget.closest('.list-card-company');

      listParent.classList.toggle('list-card-company_active');
      
      if ( hasClass(listParent, 'list-card-company_active') ) {
        event.currentTarget.textContent = 'Свернуть';
      } else {
        event.currentTarget.textContent = 'Показать все';
      }
    }, false);
  }

  // read more comments
  const listComments = document.querySelectorAll('.list-comments');
  if (listComments) {
    listComments.forEach(block => {
      block.querySelector('.list-comments__read-more').addEventListener('click', (event) => {
        event.preventDefault();
        block.classList.toggle('list-comments_active');
      
        if ( hasClass(block, 'list-comments_active') ) {
          event.currentTarget.textContent = 'Свернуть';
        } else {
          event.currentTarget.textContent = 'Показать все';
        }
      }, false);
    }, false);
  }

});