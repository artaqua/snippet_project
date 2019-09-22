// Hide/Show Scroll Page
export function toggleScroll(state) {
  if ( state === 'show' ) document.querySelector('body').classList.remove('overflowed');
  if ( state === 'hide' ) document.querySelector('body').classList.add('overflowed');
}

export function hasClass(el, cls) {
  return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}

export function youtube() {
  setTimeout(() => {
    var youtube = document.querySelectorAll(".youtube__player");
    
    for (var i = 0; i < youtube.length; i++) {
      
      var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/sddefault.jpg";
      
      var image = new Image();
          image.src = source;
          image.addEventListener( "load", function() {
            youtube[ i ].appendChild( image );
          }( i ) );
      
          youtube[i].addEventListener( "click", function() {

            var iframe = document.createElement( "iframe" );

                iframe.setAttribute( "frameborder", "0" );
                iframe.setAttribute( "allowfullscreen", "" );
                iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );

                this.innerHTML = "";
                this.appendChild( iframe );
          } );  
    };
  }, 2000);
}