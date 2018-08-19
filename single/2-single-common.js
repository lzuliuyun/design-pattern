const getSingle = function(fn) {
  let result;

  return function() {
    return result || (result = fn.apply(this, arguments));
  }

};

const createLoginLayer = function() {
  const div = document.createElement('div');
  div.innerHTML = '我是登陆模态框';
  document.body.appendChild(div);

  return div;
}

const createSingleLoginLayer = getSingle(createLoginLayer);
const loginLayer1 = createLoginLayer();
const loginLayer2 = createLoginLayer();