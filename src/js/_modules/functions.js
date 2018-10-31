// SmoothScroll
export function smoothScroll(duration) {
  $('a[href^="#"]').on('click', function(event) {
    var target = $( $(this).attr('href') );

    if ( target.length ) {
      event.preventDefault();
      $('html,body').animate({
        scrollTop: target.offset().top
      }, duration);
    }
  });
}

// Hide/Show Scroll Page
export function hideScroll() {
  if ( $('body').hasClass('fancybox-active') ) {
    return null
  } else {
    $('html').removeClass('show-scroll');
  }
}
export function showScroll() {
  if ( $('body').hasClass('fancybox-active') ) {
    return null
  } else {
    $('html').addClass('show-scroll');
  }
}

// Elem ripple effect btn/link etc
export function rippleEffect(elem) {
  $(elem).click(function (e) {
    // Remove any old one
    $(".ripple").remove();

    // Setup
    var posX = $(this).offset().left,
        posY = $(this).offset().top,
        buttonWidth = $(this).width(),
        buttonHeight =  $(this).height();

    // Add the element
    $(this).prepend("<span class='ripple'></span>");

   // Make it round!
    if(buttonWidth >= buttonHeight) {
      buttonHeight = buttonWidth;
    } else {
      buttonWidth = buttonHeight;
    }

    // Get the center of the element
    var x = e.pageX - posX - buttonWidth / 2;
    var y = e.pageY - posY - buttonHeight / 2;

    // Add the ripples CSS and start the animation
    $(".ripple").css({
      width: buttonWidth,
      height: buttonHeight,
      top: y + 'px',
      left: x + 'px'
    }).addClass("rippleEffect");
  });
}
// Viewport Height to elem
export function viewportHeight(elem) {
  $(elem).css({
    'min-height': $(window).height() - ( $('body').innerHeight() - $('body').height() )
  });
}

// elem img/svg etc aline on windows height/width
export function squeezeInWindow(widthImg,heightImg,squeezeElement) {
  $(document).ready(function() {
    var mainBox       = $(squeezeElement),
        mainBoxWidth  = $("body").width(),
        mainBoxHeight = (heightImg*mainBoxWidth)/widthImg,
        windowWidth   = $(window).width(),
        windowHeight  = $(window).height();

    function funcResize(){
      mainBoxWidth    = $('body').width();
      mainBoxHeight   = (heightImg*mainBoxWidth)/widthImg;
      windowWidth     = $(window).width();
      windowHeight    = $(window).height();

      mainBox.css({
        "height": (heightImg*mainBoxWidth)/widthImg,
        "width": mainBoxWidth
      });

      if(mainBoxHeight<windowHeight){
        mainBox.css({
          "height": windowHeight,
          "width": (windowHeight*widthImg)/heightImg
        });
      }
    }
    funcResize();
  });
}