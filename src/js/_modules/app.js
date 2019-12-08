;'use strict';

import LazyLoad from 'vanilla-lazyload';
import Swiper from 'swiper';
import noUiSlider from 'nouislider';
import 'lightgallery.js';
import anime from 'animejs/lib/anime.es.js';
import 'waypoints/lib/noframework.waypoints.js';
import { 
  toggleScroll,
  hasClass,
} from './functions.js';
import yandexMap from './yandexMap.js';
import youtube from './youtube.js';

// APP
let lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy"
});

// Event DOM Ready
document.addEventListener("DOMContentLoaded", () => {

  // Loader Page
  (function() {
    const loader = document.querySelector('.loader');

    loader.classList.add('loader_hide');
  })();

  // Animations
  (function () {
    const animElems = document.querySelector('.animation-elem');

    anime({
      targets: '.animation-elem',
      opacity: 0,
      duration: 0
    });

    function doAnimate() {
      anime({
        targets: '.animation-elem',
        easing: 'easeInOutBack',
        opacity: [0,1],
        translateY: ['100px',0],
        duration: 1000,
        delay: anime.stagger(200, {start: 500})
      });
    }

    // Когда доскролили до елемента начать анимацию
    if ( animElems ) {
      const waypoint = new Waypoint({
        element: animElems,
        handler: function(direction) {
          if( direction === 'down' ) {
            doAnimate();
            // Animate once
            this.destroy();
          }
        },
        offset: '100%'
      });
    }
  })();

  // Cookies close
  const cookiesBtn = document.querySelector('.cookies__btn');
  if (cookiesBtn) {
    cookiesBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const cookieParent = event.currentTarget.closest('.cookies');
      cookieParent.style.display = "none";
    });
  }

  // navLinks
  const navPageLinksDropdown = document.querySelectorAll('.list-nav-page__link-dropdown');
  if (navPageLinksDropdown) {
    navPageLinksDropdown.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.currentTarget;
        const parentItem = target.closest('.list-nav-page__item');
        const items = document.querySelectorAll('.list-nav-page__item');

        if ( !parentItem.classList.contains('list-nav-page__item_active') ) {
          items.forEach((item) => {
            item.classList.remove('list-nav-page__item_active');
          })
          parentItem.classList.add('list-nav-page__item_active');
        } else {
          parentItem.classList.remove('list-nav-page__item_active');
        }
      }, false);
    }, false);
  }
  // close nav links when click out block
  document.addEventListener('click', (e) => {
    const items = document.querySelectorAll('.list-nav-page__item');
    
    if ( !event.target.closest('.list-nav-page__item') ) {
      items.forEach((item) => {
        item.classList.remove('list-nav-page__item_active');
      });
    }
  });

  // Popups
  (function() {
    // open select city
    const cityLinks = document.querySelectorAll('.city__link');
    if (cityLinks) {
      cityLinks.forEach(link => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          const popup = document.querySelector('.popup_city');
          popup.classList.add('popup_active');
          toggleScroll('hide');
        }, false);
      });
    }
    // open add comment
    const linksAddComment = document.querySelectorAll('.js-add-comment');
    if (linksAddComment) {
      linksAddComment.forEach(link => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          const popup = document.querySelector('.popup_comment');
          popup.classList.add('popup_active');
          toggleScroll('hide');
        }, false);
      });
    }
    // close popup
    const popupBtnClose = document.querySelectorAll('.popup__close');
    if (popupBtnClose) {
      popupBtnClose.forEach(btn => {
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          const popup = event.currentTarget.closest('.popup');
          popup.classList.remove('popup_active');
          toggleScroll('show');
        }, false);
      });
    }
  })();

  // change select city
  const cityCheckboxs = document.querySelectorAll('.list-city__input');
  if (cityCheckboxs) {
    cityCheckboxs.forEach(checkbox => {
      checkbox.addEventListener('change', (event) => {
        const target = event.currentTarget;
        const inputs = document.querySelectorAll('.list-city__input');
        const cityNames = document.querySelectorAll('.city__name');
        const popup = document.querySelector('.popup_city');

        cityCheckboxs.forEach((input) => {
          if ( input.checked ) {
            cityNames.forEach((item) => {
              item.textContent = input.value;
            });
            // close popup
            popup.classList.remove('popup_active');
            toggleScroll('show');
          }
        });
      }, false);
    });
  }

  // Tabs
  (function () {
    const tabs = document.querySelectorAll('.tab');
    if (tabs) {
      tabs.forEach(tab => {
        const dataTab = tab.querySelector('.tab__link_active').getAttribute('data-tab');
        const contentItems = tab.querySelectorAll('.tab__content-item');
        const tabLinks = tab.querySelectorAll('.tab__link');
        const dataTitle = tab.querySelector('.tab__link_active').getAttribute('data-title');

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
            const clickedLinkDataTitle = clickedLink.getAttribute('data-title');

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

  // Animations
  (function () {
    const animServices = document.querySelector('.services__row');

    function doAnimate() {
      anime({
        targets: '.services__row, .services__col',
        easing: 'easeInOutQuad',
        opacity: [0,1],
        rotateX: [-45,0],
        translateY: [-20,0],
        duration: 1000,
        delay: anime.stagger(100, {start: 300})
      });
    }

    // Когда доскролили до елемента начать анимацию
    if ( animServices ) {
      const waypoint = new Waypoint({
        element: animServices,
        handler: function(direction) {
          if( direction === 'down' ) {
            doAnimate();
            // Animate once
            this.destroy();
          }
        },
        offset: '100%'
      });
    }

    const featuresSpecialCol = document.querySelector('.features-special');

    if (featuresSpecialCol) {
      const waypoint = new Waypoint({
        element: featuresSpecialCol,
        handler: function(direction) {
          if( direction === 'down' ) {
            console.log('test');
            anime({
              targets: '.features-special__col',
              easing: 'easeInOutSine',
              scale: [0.8,1],
              opacity: [0,1],
              rotateX: [90,0],
              translateY: ['-50%',0],
              duration: 1200,
              delay: anime.stagger(120, {start: 300})
            });
            
            // Animate once
            this.destroy();
          }
        },
        offset: '100%'
      });
    }
  })();

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

        anime({
          targets: '.list-nav-sidebar__item, .sidebar-menu__city',
          easing: 'easeOutBack',
          opacity: [0,1],
          translateX: ['20px',0],
          rotateX: [90,0],
          duration: 800,
          delay: anime.stagger(100, {start: 300})
        });
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
      document.querySelector('.sidebar-menu__sub-menu').classList.remove('sidebar-menu__sub-menu_active');
      toggleScroll('show');
    }, false);
  }

  document.addEventListener('keydown', (event) => {
    if (event.keyCode == 27) {
      event.preventDefault();
      document.querySelector('.btn-menu').classList.remove('btn-menu_active');
      document.querySelector('.sidebar-menu').classList.remove('sidebar-menu_active');
      document.querySelector('.sidebar-menu__sub-menu').classList.remove('sidebar-menu__sub-menu_active');
      document.querySelectorAll('.popup').forEach(popup => {
        popup.classList.remove('popup_active');
      })

      toggleScroll('show');
    }
  }, false);


  // toggle filter info
  const listFilterMore = document.querySelectorAll('.list-filter__more');
  if (listFilterMore) {
    listFilterMore.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const parentItem = event.currentTarget.closest('.list-filter__item');
        
        parentItem.classList.toggle('list-filter__item_active');
      }, false);
    });
  }

  // navLinksSidebar
  const navLinksSidebar = document.querySelectorAll('.list-nav-sidebar__link-dropdown');
  if (navLinksSidebar) {
    navLinksSidebar.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.currentTarget;
        const dataSubMenu = target.getAttribute('data-sub-menu');
        const subMenus = document.querySelectorAll('.list-sub-menu');
        const activeSubMenu = document.querySelector(dataSubMenu);
        const sidebarSubMenu = document.querySelector('.sidebar-menu__sub-menu');

        if ( !sidebarSubMenu.classList.contains('sidebar-menu__sub-menu_active') ) {
          subMenus.forEach((item) => {
            item.classList.remove('list-sub-menu_active');
          })
          sidebarSubMenu.classList.add('sidebar-menu__sub-menu_active')
          activeSubMenu.classList.add('list-sub-menu_active');
        } else {
          sidebarSubMenu.classList.remove('sidebar-menu__sub-menu_active')
          activeSubMenu.classList.remove('list-sub-menu_active');
        }
      }, false);
    }, false);
  }
  // close sub menu
  const closeSubMenu = document.querySelectorAll('.sidebar-menu__close-sub-menu');
  if (closeSubMenu) {
    closeSubMenu.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const sidebarSubMenu = document.querySelector('.sidebar-menu__sub-menu');

        sidebarSubMenu.classList.remove('sidebar-menu__sub-menu_active')
      }, false);
    }, false);
  }

  // Sort
  const sortLinks = document.querySelectorAll('.list-sort__link');
  if (sortLinks) {
    sortLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.currentTarget;

        if ( !target.classList.contains('list-sort__link_active') ) {
          sortLinks.forEach((item) => {
            item.classList.remove('list-sort__link_active', 'list-sort__link_increase');
          });
          target.classList.add('list-sort__link_active');
        } else {
          target.classList.toggle('list-sort__link_increase');
        }
      }, false);
    }, false);
  }

  // Sidebar settings
  const sidebarSettings = document.querySelectorAll('.sidebar__settings');
  if (sidebarSettings) {
    sidebarSettings.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const sidebar = document.querySelector('.sidebar');

        sidebar.classList.toggle('sidebar_active');
      }, false);
    }, false);
  }

  // Swipe icons
  const scrollTable = document.querySelectorAll('.swipe__scroll');
  if (scrollTable) {
    scrollTable.forEach(block => {
      block.addEventListener('scroll', (event) => {
        event.currentTarget.previousElementSibling.classList.add('swipe__icon_hide');
      }, false);
    }, false);
  }

  // Ranges in sidebar
  (function(){
    const rangeSum = document.querySelector('.list-opts__range_sum');
    const rangeSumMin = 10000;
    const rangeSumMax = 1200000;
    const valueSum = document.querySelector('.list-opts__value_sum');

    if (rangeSum) {
      noUiSlider.create(rangeSum, {
        start: 400000,
        step: 1,
        connect: "lower",
        range: {
          'min': rangeSumMin,
          'max': rangeSumMax
        }
      });
      rangeSum.noUiSlider.on('update', function (values, handle) {
        function numberWithSpaces(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
        const pretifyNumb = numberWithSpaces( Math.floor(values[0]) );
        valueSum.textContent = pretifyNumb + ' \u20BD';
      });
    }

    const rangeDays = document.querySelector('.list-opts__range_days');
    const rangeDaysMin = 1;
    const rangeDaysMax = 600;
    const valueDays = document.querySelector('.list-opts__value_days');

    if (rangeDays) {
      noUiSlider.create(rangeDays, {
        start: 200,
        step: 1,
        connect: "lower",
        range: {
          'min': rangeDaysMin,
          'max': rangeDaysMax
        }
      });
      rangeDays.noUiSlider.on('update', function (values, handle) {
        valueDays.textContent = Math.floor(values[0]) + ' дней';
      });
    }
  })();

  // Approval
  (function(){
    const approvals = document.querySelectorAll('.approval');
    if (approvals) {
      approvals.forEach(item => {
        const percent = Number(item.querySelector('.approval__line').getAttribute('data-percent'));
        const textPercent = item.querySelector('.approval__percents');
        const line = item.querySelector('.approval__line');
        let color;
        let percentAnim = {
          value: '0%'
        };

        // Add text
        textPercent.textContent = percent + '%';

        // Меняем цвет в зависимости от процента
        if ( percent <= 30 ) {
          color = '#e27171';
        } else if ( percent > 30 && percent < 65 ) {
          color = '#ffdd2d';
        } else if ( percent >= 65 ) {
          color = '#7aba72';
        }

        const waypoint = new Waypoint({
          element: item,
          handler: function(direction) {
            if( direction === 'down' ) {
              anime({
                targets: line,
                easing: 'easeInOutSine',
                width: ['0%', percent + '%'],
                'background-color': color,
                duration: 500,
                complete: function() {
                  anime({
                    targets: textPercent,
                    easing: 'easeInOutSine',
                    opacity: [0,1],
                    duration: 500,
                  });
                  anime({
                    targets: percentAnim,
                    value: percent + '%',
                    round: 1,
                    easing: 'linear',
                    duration: 1500,
                    update: function() {
                      textPercent.textContent = percentAnim.value;
                    }
                  });
                }
              });
              
              // Animate once
              this.destroy();
            }
          },
          offset: '100%'
        });
      }, false);
    }
  })();
  
  // Range Sum credit
  (function(){
    const rangeSum = document.querySelector('.js-range-price');
    const rangeSumMin = 10000;
    const rangeSumMax = 2000000;
    const input = document.querySelector('.js-input-price');
    let currentVal;

    if (rangeSum) {
      noUiSlider.create(rangeSum, {
        start: 400000,
        step: 1,
        connect: "lower",
        range: {
          'min': rangeSumMin,
          'max': rangeSumMax
        }
      });
      rangeSum.noUiSlider.on('update', function (values, handle) {
        const pretifyNumb = numberWithSpaces( Math.floor(values[0]) );
        input.value = pretifyNumb;
        currentVal = input.value;
      });

      // Input
      const doDebounce = debounce(function() {
        let value = input.value;
        value = value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        const delSpacesText = value.replace(/\s/g, '');
        // Set to range
        rangeSum.noUiSlider.set( delSpacesText );
      }, 2000);

      input.addEventListener('input', doDebounce);
    }

    function numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  })();

  // range days
  (function(){
    const rangeDays = document.querySelector('.js-range-days');
    const rangeDaysMin = 1;
    const rangeDaysMax = 365;
    const input = document.querySelector('.js-input-days');

    if (rangeDays) {
      noUiSlider.create(rangeDays, {
        start: 100,
        step: 1,
        connect: "lower",
        range: {
          'min': rangeDaysMin,
          'max': rangeDaysMax
        }
      });
      rangeDays.noUiSlider.on('update', function (values, handle) {
        input.value = Math.floor(values[0]) + ' дней';
      });

      // Input
      const doDebounce = debounce(function() {
        let value = input.value;
        value = Number( value.replace(/\D+/g,"") );
        // Set to range
        rangeDays.noUiSlider.set( value );
      }, 2000);

      input.addEventListener('input', doDebounce);
    }
  })();

  // range month
  (function(){
    const rangeMonth = document.querySelector('.js-range-month');
    const rangeMonthMin = 1;
    const rangeMonthMax = 36;
    const input = document.querySelector('.js-input-month');

    if (rangeMonth) {
      noUiSlider.create(rangeMonth, {
        start: 12,
        step: 1,
        connect: "lower",
        range: {
          'min': rangeMonthMin,
          'max': rangeMonthMax
        }
      });
      rangeMonth.noUiSlider.on('update', function (values, handle) {
        input.value = Math.floor(values[0]) + ' месяцев';
      });

      // Input
      const doDebounce = debounce(function() {
        let value = input.value;
        value = Number( value.replace(/\D+/g,"") );
        // Set to range
        rangeMonth.noUiSlider.set( value );
      }, 2000);

      input.addEventListener('input', doDebounce);
    }
  })();

  // Selects
  (function() {
    const select = document.querySelector('.js-select');
    if (select) {
      const selectChoice = new Choices(select, {
        noResultsText: 'Не найдено',
        itemSelectText: '',
        shouldSort: false,
        searchEnabled: false,
      });
    }
  })();

  // List credits full info
  const linksFullInfo = document.querySelectorAll('.list-credits__link_full-info');
  if (linksFullInfo) {
    linksFullInfo.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.currentTarget;
        const fullInfo = target.closest('.list-credits__item, .list-credits__item-more').querySelector('.list-credits__full-info');

        if ( !target.classList.contains('list-credits__link_active') ) {
          target.classList.add('list-credits__link_active');
          target.querySelector('.list-credits__link-text').textContent = 'Скрыть';
          fullInfo.classList.add('list-credits__full-info_active');
        } else {
          target.classList.remove('list-credits__link_active');
          target.querySelector('.list-credits__link-text').textContent = 'Подробнее';
          fullInfo.classList.remove('list-credits__full-info_active');
        }
      }, false);
    }, false);
  }

  // List credits more
  const linksMoreCredits = document.querySelectorAll('.list-credits__link_more');
  if (linksMoreCredits) {
    linksMoreCredits.forEach(link => {
      const targetText = link.querySelector('.list-credits__link-text').textContent;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.currentTarget;
        const containerMore = target.closest('.list-credits__item').querySelector('.list-credits__container-more');

        if ( !target.classList.contains('list-credits__link_active') ) {
          target.classList.add('list-credits__link_active');
          target.querySelector('.list-credits__link-text').textContent = 'Скрыть';
          containerMore.classList.add('list-credits__container-more_active');
        } else {
          target.classList.remove('list-credits__link_active');
          target.querySelector('.list-credits__link-text').textContent = targetText;
          containerMore.classList.remove('list-credits__container-more_active');
        }
      }, false);
    }, false);
  }

  function doPercents() {
    // Paботает за счет strokeDasharray
    const bar = document.querySelector('.dev-rating__bar');
    const countElem = document.querySelector('.dev-rating__count');
    const devCount = Number( countElem.textContent );

    // Высчитуем процент от числа
    const totalNumb = 100;
    const numb = devCount;
    let val = (numb / totalNumb * 100);

    // Вычисление радиуса у svg
    if (isNaN(val)) {
      val = 100;
    } else {
      const r = bar.getAttribute('r');
      const c = Math.PI * (r * 2);

      if (val < 0) {
        val = 0;
      }
      if (val > 100) {
        val = 100;
      }

      const pct = ((100 - val) / 100) * c;

      bar.style.strokeDashoffset = c;
      bar.style.strokeDasharray = c;
      
      function animCircle() {
        // Анимируем круг
        anime({
          targets: '.dev-rating__bar',
          easing: 'easeInOutCubic',
          duration: 2000,
          strokeDashoffset: pct,
          strokeDasharray: c
        });
      }
      animCircle();
    }
  }
  const devRating = document.querySelector('.dev-rating');
  if (devRating) {
    const waypointdevRating = new Waypoint({
      element: devRating,
      handler: function(direction) {
        if( direction === 'down' ) {
          doPercents();
          // Animate once
          this.destroy();
        }
      },
      offset: '100%'
    });
  }

  // List credits more
  const linksMoreComment = document.querySelectorAll('.comments__btn-more');
  if (linksMoreComment) {
    linksMoreComment.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.currentTarget;
        const targetText = target.textContent;
        const comments = target.closest('.comments');
        const scrollElement = window.document.scrollingElement || window.document.body || window.document.documentElement;
        const commentstOffsetTop = document.querySelector('.comments').offsetTop - 70;

        if ( !comments.classList.contains('comments_active') ) {
          comments.classList.add('comments_active');
          target.textContent = 'Скрыть';        
        } else {
          comments.classList.remove('comments_active');
          target.textContent = 'Показать еще';
          anime({
            targets: scrollElement,
            scrollTop: commentstOffsetTop,
            duration: 500,
            easing: 'easeInOutCubic'
          });
        }
      }, false);
    }, false);
  }

});

// Init Map
yandexMap();

// Init YouTube player
youtube();