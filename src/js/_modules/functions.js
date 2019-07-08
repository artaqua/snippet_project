// Hide/Show Scroll Page
export function toggleScroll(state) {
  if ( state === 'show' ) document.querySelector('body').classList.remove('overflowed');
  if ( state === 'hide' ) document.querySelector('body').classList.add('overflowed');
}

export function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

export function hasClass(el, cls) {
  return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}