let getStyle = (obj, attr) => {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  }
  else {
    return window.getComputedStyle(obj, null)[attr];
  }
};
let getScrollHeight = () => {
  return new Promise((resolve, reject) => {
    let bodyHeight = document.querySelector('#getContentHeight').clientHeight;
    let bodyTopHeight = document.querySelector('.bodyTop').clientHeight;
    let footHeight = document.querySelector('footer').clientHeight;

    let dom = document.querySelector(".content");
    let padding = getStyle(dom, 'paddingBottom');
    let p = padding.substr(0, padding.lastIndexOf('px')) * 2;

    let tableHeight = bodyHeight - bodyTopHeight - footHeight - p;
    resolve(tableHeight)
  })
};
export {getScrollHeight};
