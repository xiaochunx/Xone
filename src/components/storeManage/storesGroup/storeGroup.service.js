import axios from 'axios'

//获取门店标签列表
let getList = (token,p) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.store.storeLabelList");
    formData.append("page", p.page);
    formData.append("pagesize", p.size);
    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};


//获取门店标签详情
let getOneStore = (token,data) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.store.storeLabelInfo");

    formData.append("id", data.id);

    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{
      resolve(res)
    })

  })
};

//编辑门店标签
let updateOne = (token,data) => {

  let list = [];

  data.store.forEach((item)=>{
    if(item.select === true){
      list.push(item.code)
    }
  })
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.store.editStoreLabel");

    formData.append("id", data.id);
    formData.append("name", data.name);
    formData.append("thirdCode", window.JSON.stringify(data.thirdCode));
    formData.append("storeIds", list.join(','));

    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{
      resolve(res)
    })

  })
};


//删除门店标签
let delOne = (token,id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.store.delStoreLabel");
    formData.append("id", id);
    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{
      resolve(res)
    })


  })
};


//获取标签下的门店列表

let getOne = (token,id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("redirect", "x1.store.getStoreListByLabelId");

    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};


export default {getList, updateOne,getOne,getOneStore,delOne}


