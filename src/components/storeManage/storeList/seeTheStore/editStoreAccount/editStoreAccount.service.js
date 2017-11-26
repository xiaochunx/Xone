import axios from 'axios'

//获取门店标签列表
let getList = (token) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.store.storeLabelList");
    formData.append("page", 1);
    formData.append("pagesize", 1000);
    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};


//查看门店-基础信息

let getFirst = (token,id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("redirect", "x1.store.storeBaseInfo");

    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{

        resolve(res)

    })
  })
};

//编辑门店-基础信息-保存
let editStore = (token,storeData) => {
  console.log(storeData)
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.store.saveStoreBaseInfo");

    formData.append("id", storeData.id);
    formData.append("labelId", storeData.storeLabelId);
    formData.append("openTimeStart", storeData.openTimeStart);
    formData.append("openTimeEnd", storeData.openTimeEnd);
    formData.append("orderPrompting", storeData.orderPrompting);
    formData.append("payJumpUrl", storeData.payJumpUrl);
    formData.append("urlWithCode", storeData.urlCode);
    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{

      resolve(res)

    })
  })
};


//查看门店-收款账户
let getSecond = (token,id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("redirect", "x1.store.storeAccount");

    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{

      resolve(res)

    })
  })
};
export default {getFirst,getSecond,getList,editStore}


