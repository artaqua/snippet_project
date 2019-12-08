// Hide/Show Scroll Page
export function toggleScroll(state) {
  if ( state === 'show' ) document.querySelector('body').classList.remove('overflowed');
  if ( state === 'hide' ) document.querySelector('body').classList.add('overflowed');
}

// Проверка есть ли класс у DOM елемента
export function hasClass(el, cls) {
  return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}

// Функция выполняется через каждые N милисекунд после события
export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Функция выполняется один раз
export function once(fn, context) { 
  var result;
    
  return function() { 
    if(fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }
   
    return result;
  };
}