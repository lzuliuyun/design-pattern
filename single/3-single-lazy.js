const createLoginLayer = (function() {
  let div;
  return function(){
    if (!div) {
      div = document.createElement('div');
      div.innerHTML = 'loginLayer';
    }

    return div;
  }
})();

var loginLayer = createLoginLayer();