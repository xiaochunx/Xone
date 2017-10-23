let getScrollHeight =  () => {
  return new Promise((resolve,reject)=>{
    let bodyHeight = document.querySelector('#getContentHeight').clientHeight;
    let bodyTopHeight = document.querySelector('.bodyTop').clientHeight;
    let footHeight = document.querySelector('footer').clientHeight;
    let tableHeight = bodyHeight - bodyTopHeight - footHeight - 50;
    resolve(tableHeight)
  })
};
export {getScrollHeight};
