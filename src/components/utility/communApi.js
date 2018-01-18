import axios from 'axios'
let get= function(key) {
  return window.JSON.parse(window.localStorage.getItem(key));
};

//左侧组织架构

let getLeft = () => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.store.storeLeft");
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//地区
let getArea = (pid = '') => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("pid", pid);
    axios.post(`index.php?controller=area&action=getAreaList&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//支付方式列表
let getWayInfo = () => {
  return new Promise((resolve, reject) => {
    axios.post(`index.php?controller=jichu&action=getWayInfo&token=${get('token')}`).then((res)=>{
      resolve(res)
    })
  })
};

//支付通道列表
let getChannelInfo = (paymentId = "") => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("paymentId", paymentId);
    axios.post(`index.php?controller=jichu&action=getChannelInfo&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//获取门店列表
let getList = (levelId = -1) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.store.storeList");

    formData.append("page", 1);
    formData.append("pagesize", 1000);
    formData.append("storeName", '');
    formData.append("levelId", levelId);
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};


//获取门店列表（全权限）
let getStoreListAll = () => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.order.storeList");
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//页面权限
let getArr = (arr) => {
  let listMap = {};
  if(arr){
    for (let i = 0, id, name, key; i < arr.length; i++) {
      id = arr[i].id;
      name = arr[i].name;
      key = name;
      if (!!listMap[key]) {
        listMap[key]++;
      } else {
        listMap[key] = name;
      }
    }

    return listMap;
  }
};

export {getLeft,getArea,get,getWayInfo,getChannelInfo,getList,getArr,getStoreListAll,axios}
