import axios from 'axios'

//新增门店标签

let addOne = (token,data,storeIds) => {
  console.log(storeIds)
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    let thirdCode = window.JSON.stringify(data.thirdPartyCoding);
    formData.append("redirect", "x1.store.addStoreLabel");

    formData.append("name", data.name);
    formData.append("thirdCode", thirdCode);
    formData.append("storeIds", storeIds);

    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//标签添加门店时搜索

let searchStore = (token,areaId ='',storeName = '') => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.store.searchStore");

    formData.append("areaId", areaId);
    formData.append("storeName", storeName);
    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};


//地区
let area = (token,pid = '') => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("pid", pid);
    axios.post(`?controller=area&action=getAreaList&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

export default {addOne,searchStore,area}



