import axios from 'axios'

//获取门店列表 api
let getList = (token,p,data) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.stores.index");
    formData.append("levelid", data);
    formData.append("storename", data);
    formData.append("areaId", data);
    formData.append("x1", data);

    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//获取组织架构
let getLevel = (token) => {
  return new Promise((resolve, reject) => {
    axios.get(`?controller=level&action=index&token=${token}`).then((res)=>{
      resolve(res)
    })
  })
};


//新建组织架构
let addLevel = (token,data) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", data.id);
    formData.append("levelname", data.levelname);
    formData.append("levelcodes", window.JSON.stringify(data.levelcodes) );

    formData.append("business_src", data.business_src_url);
    formData.append("businesscode_src", data.businesscode_src_url);
    formData.append("account_src", data.account_src_url);
    formData.append("tax_src", data.tax_src_url);
    formData.append("legalman_1", data.legalman_1_url);
    formData.append("legalman_2", data.legalman_2_url);

    axios.post(`?controller=level&action=create&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};


//获取单个组织架构
let getOneLevel = (token,data) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", data.id);
    axios.post(`?controller=level&action=view&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//更新组织架构
let updateLevel = (token,data) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", data.id);
    formData.append("levelname", data.levelname);
    formData.append("levelcodes", window.JSON.stringify(data.levelcodes) );

    formData.append("business_src", data.business_src_url);
    formData.append("businesscode_src", data.businesscode_src_url);
    formData.append("account_src", data.account_src_url);
    formData.append("tax_src", data.tax_src_url);
    formData.append("legalman_1", data.legalman_1_url);
    formData.append("legalman_2", data.legalman_2_url);
    axios.post(`?controller=level&action=update&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//删除组织架构
let delLevel = (token,id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", id);

    axios.post(`?controller=level&action=delete&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};


export default {getLevel,addLevel,updateLevel,delLevel,getOneLevel}



