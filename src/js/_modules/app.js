;'use strict';

import $ from 'jquery';
import imagesLoaded from 'imagesloaded';
import 'perfect-scrollbar/dist/js/perfect-scrollbar.jquery.js';
import 'slick-carousel';
import '../_plagins/jquery.fancybox.js';
import 'ion-rangeslider';
import 'select2';
import fitvids from 'fitvids';
import anime from 'animejs';
import waypoint from 'waypoints/lib/jquery.waypoints.js';
import charming from 'charming';

import { 
  smoothScroll, 
  hideScroll, 
  showScroll, 
  rippleEffect 
} from './functions.js';
import { loadGoogleMapAsync } from './mapGoogle.js';

// APP
// Event DOM Ready
$(function() {

  // btn ripple effect
  rippleEffect('.btn');

  // Menu
  $('body').on('click', 'header.header-page .btn-menu', (event) => {
    hideScroll();
    $('aside.sidebar-menu').addClass('active');
  });
  $('body').on('click', 'aside.sidebar-menu .close', (event) => {
    event.preventDefault();
    showScroll();
    $('aside.sidebar-menu').removeClass('active');
  });
  $(document).on('keydown', (event) => {
    if (event.keyCode == 27) {
      event.preventDefault();
      showScroll();
      $('aside.sidebar-menu').removeClass('active');
    }
  });

  // Popups
  // order-call
  $('body').on('click', '.btn-order-call', (event) => {
    event.preventDefault();
    $('.order-call-popup').toggleClass('active');
    hideScroll();
  });
  // feedback
  $('body').on('click', '.subscribe', (event) => {
    event.preventDefault();
    $('.feedback-popup').toggleClass('active');
    hideScroll();
  });
  // more
  $('body').on('click', '.popup-shares .btn.more', (event) => {
    event.preventDefault();
    $('.more-popup').toggleClass('active');
    hideScroll();
  });
  // time-work
  $('body').on('click', '.time-work', (event) => {
    event.preventDefault();
    $('.time-work-popup').toggleClass('active');
    hideScroll();
  });
  // shares
  $('body').on('click', 'nav.nav-menu .shares, aside.sidebar-menu .shares', (event) => {
    event.preventDefault();
    $('.popup-shares').toggleClass('active');
    hideScroll();
  });
  // Close popup
  $('body').on('click', '.popup .close', (event) => {
    event.preventDefault();
    $('.popup').removeClass('active');
    showScroll();
  });
  // Close when click out block
  $(document).on('click', (event) => {
    if( $(event.target).hasClass('popup') ) {
      $('.popup').removeClass('active');
      showScroll();
    }
  })
  // keydown ESC
  $(document).on('keydown', (event) => {
    if (event.keyCode == 27) {
      $('.popup').removeClass('active');
      showScroll();
    }
  });

  // Sliders
  $('section.slider-features .slider').slick({
    dots: false,
    arrows: true,
    speed: 700,
    fade: true,
    prevArrow: $('section.slider-features .prev'),
    nextArrow: $('section.slider-features .next'),
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  $('section.section-gallery-main .slider-gallery').slick({
    dots: false,
    arrows: true,
    speed: 700,
    prevArrow: $('section.section-gallery-main .prev'),
    nextArrow: $('section.section-gallery-main .next'),
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Ranges
  $("#range-floor").ionRangeSlider({
    type: "double",
    min: 1,
    max: 12,
    from: 1,
    to: 12,
    hide_min_max: true,
    grid: false
  });
  $("#range-meters").ionRangeSlider({
    type: "double",
    min: 25,
    max: 120,
    from: 25,
    to: 80,
    hide_min_max: true,
    grid: false
  });

  // Gallery
  $('[data-fancybox]').fancybox({
    animationEffect : "zoom-in-out",
    animationDuration : 500,
    transitionEffect: 'slide',
    transitionDuration : 500,
    buttons : [
      'thumbs',
      'download',
      'close'
    ],
    beforeLoad: () => {
      $('html').removeClass('show-scroll');
    },
    afterClose: () => {
      $('html').addClass('show-scroll');
    },
  });

  // FitVids
  fitvids('.container-player');

  // Select2
  $('select').select2({
    width: '100%',
    minimumResultsForSearch: -1
  });

  // // Reveal box
  // (function() {
  //   $('.reveal-box').each( function(i) {
  //     var $el = $(this);
  //     $el.wrapInner('<div class="content"></div>');
  //     $el.append('<div class="bg"></div>');
  //     var elems = document.querySelectorAll('.reveal-box');
  //     var elem = elems[i];
  //     var revealBg = elem.querySelector('.bg');
  //     var revealContent = elem.querySelector('.content');
  //     var revealContentP = revealContent.querySelector('.wrapper-p');
  //     var revealAnimation = anime.timeline();

  //     function animate() {
  //       revealAnimation
  //         .add({
  //           targets: revealBg,
  //           translateX: [
  //             { value: '-101%' },
  //           ],
  //           duration: 10,
  //           delay: 300,
  //           easing: 'easeInOutCirc',
  //           complete: function() {
  //             revealBg.style.opacity = 1;
  //           }
  //         })
  //         .add({
  //           targets: revealBg,
  //           translateX: [
  //             { value: 0 },
  //           ],
  //           duration: 800,
  //           easing: 'easeInOutCirc',
  //           complete: function() {
  //             revealContent.style.opacity = 1;
  //             anime({
  //               targets: '.reveal-box .content .wrapper-p',
  //               opacity: 0,
  //               translateX: -40,
  //               direction: 'reverse',
  //               duration: 1000,
  //               easing: 'easeInOutCirc',
  //             });
  //           }
  //         })
  //         .add({
  //           targets: revealBg,
  //           translateX: [
  //             { value: '101%' },
  //           ],
  //           duration: 800,
  //           easing: 'easeInOutCirc',
  //         });
  //     }

  //     $('body').imagesLoaded(function(){
  //       // Animation on scroll
  //       $el.waypoint( function( direction ) {
  //         if( direction === 'down' ) {
  //           animate();
  //           // Animate once
  //           this.destroy();
  //         }
  //       }, { 
  //         offset: '100%'
  //       });
  //     });

  //   });
  // })();

  // // Animations
  // (function() {
  //   anime({
  //     targets: '.svg-animate path',
  //     strokeDashoffset: [anime.setDashoffset, 0],
  //     easing: 'easeInOutSine',
  //     duration: 4000,
  //     delay: function(el, i) {
  //       return i * 2000
  //     },
  //     direction: 'alternate',
  //     loop: true
  //   });

  //   anime({
  //     targets: '.animate-elem',
  //     translateX: [
  //       { value: '50%', duration: 2000 },
  //       { value: 0, duration: 1000 }
  //     ],
  //     translateY: [
  //       { value: '-50%', duration: 1000, delay: 3000 },
  //     ],
  //     rotate: '1turn',
  //     duration: 5000,
  //     loop: true,
  //     direction: 'alternate'
  //   });
  // })();

  // // Letters animate
  // (function() {

  //   var elements = document.querySelectorAll('.letters');
  //   elements.forEach(function(elm) { 
  //     charming(elm, {
  //       classPrefix: 'letter'
  //     });
  //   });

  //   var animeLetter1 = anime({
  //     autoplay: false,
  //     targets: '.letters-1 span',
  //     duration: 700,
  //     delay: function(el, index) { return index*50; },
  //     easing: 'easeOutCirc',
  //     opacity: 1,
  //     translateX: function(el, index) {
  //       return [(50+index*10),0]
  //     },
  //     opacity: {
  //       value: [0,1],
  //       easing: 'linear',
  //     },
  //     direction: 'alternate',
  //     loop: true,
  //   });

  //   var animeLetter2 = anime({
  //     autoplay: false,
  //     targets: '.letters-2 span',
  //     duration: 700,
  //     delay: function(el, index) { return 550+index*50; },
  //     easing: 'easeOutQuint',
  //     opacity: {
  //       value: 1,
  //       easing: 'linear',
  //     },
  //     color: '#920A50',
  //     translateY: ['-150%','0%'],
  //     rotateY: [180,0],
  //     opacity: [0,1],
  //     loop: true,
  //   });

  //   var animeLetter3 = anime({
  //     autoplay: false,
  //     targets: '.letters-3 span',
  //     duration: 6000,
  //     delay: function(el, index) { return 200*index; },
  //     easing: 'easeOutExpo',
  //     rotateY: [-90,0],
  //     color: '#04FA1D',
  //     opacity: [0,1],
  //   });

  //   $('body').imagesLoaded( function() {
  //     animeLetter1.play();
  //     animeLetter2.play();
  //     animeLetter3.play();
  //   });

  // })();

  // // Tab
  // (function () {
  //   // on init
  //   var filterValue = $('.tab .tab-nav a.active').attr('data-tab');
  //   $('.tab .tab-item').removeClass('active');
  //   $(filterValue).addClass('active');

  //   // on click
  //   $('body').on('click', '.tab .tab-nav a', function(e) {
  //     e.preventDefault();
  //     // Active class
  //     $('.tab .tab-nav a').removeClass('active')
  //     var indexElem = $(e.target).closest('li').index();
  //     $('.tab .tab-nav').each(function(index, el) {
  //       $(this).find('li').eq(indexElem).find('a').addClass('active');
  //     });

  //     var filterValue = $(this).attr('data-tab');
  //     $('.tab .tab-item').removeClass('active');
  //     $(filterValue).addClass('active');
  //   });
  // })();

  // // Tooltips
  // (function() {
  //   var containerTooltip = $('[data-container-tooltip]');

  //   containerTooltip.each(function(index, el) { 
  //     var $this = $(this),
  //         dataContainerTooltip = $this.attr('data-container-tooltip'),
  //         linkHover = $this.find('a[data-tooltip]'),
  //         tooltipContent = $('#tooltip-content-' + dataContainerTooltip ),
  //         tooltip = $('.hover-tooltip');

  //     // Position tooltip
  //     $this.closest('.buildings').mousemove(function(e) {
  //       var y = e.pageY - $(this).offset().top - tooltip.outerHeight() - 20;
  //       var x = e.pageX - $(this).offset().left - ( tooltip.outerWidth() / 2 );

  //       tooltip.css({
  //         "top": y,
  //         "left": x
  //       });
  //     });

  //     // On hover
  //     linkHover.hover(function() {
  //       var dataTooltip = $(this).attr('data-tooltip');

  //       // очистить
  //       tooltip.empty();
  //       // добавим контент
  //       tooltipContent.find(dataTooltip).clone().appendTo(tooltip);

  //       tooltip.addClass('active');
  //     }, function() {
  //       tooltip.removeClass('active');
  //     });
  //   });
  // })();

  // // Ajax load content
  // (function() {

  //   $.ajax({cache: true});

  //   $('.btn-ajax').on('click', function() {
  //     var spinner = '<div class="spinner">'
  //                   + '<div class="bounce1"></div>'
  //                   + '<div class="bounce2"></div>'
  //                   + '<div class="bounce3"></div>'
  //                 + '</div>';
  //     var newHtml = 'cont-ajax.html';

  //     $('.load-content').html(spinner).load(newHtml);
  //   });
  // })();

});

// Event load all img on page
$('body').imagesLoaded(() => {
  loadPage();
  loadGoogleMapAsync();
});

const loadPage = () => {
  // Display loading...
  $(".page-loading").addClass('load').delay(700).queue(() => {
    $(this).addClass('anim-stop');
    showScroll();
  });
};
