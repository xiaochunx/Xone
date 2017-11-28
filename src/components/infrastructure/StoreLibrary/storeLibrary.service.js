import axios from 'axios'

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
    axios.get(`?controller=level&action=view&token=${token}&id=${data.id}`).then((res)=>{
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

//获取基础门店列表
let getBsList = (token,p,levelid = -1,storename = '') => {
  console.log(p)
  return new Promise((resolve, reject) => {
    axios.get(`?controller=stores&action=index&token=${token}&levelid=${levelid}&storename=${storename}&page=${p.page}&pagesize=${p.size}`).then((res)=>{
      resolve(res)
    })
  })
};

//获取一条基础门店
let getBsOne = (token,id) => {
  return new Promise((resolve, reject) => {
    axios.get(`?controller=stores&action=view&token=${token}&id=${id}`).then((res)=>{
      resolve(res)
    })
  })
};


//更新一条基础门店
let updateBsOne = (token,data) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", data.id);
    formData.append("storename", data.storename);
    formData.append("storecodeid", data.storecodeid);
    formData.append("tel", data.tel);
    formData.append("brand", data.brand);
    formData.append("provinceid", data.provinceid);
    formData.append("cityid", data.cityid);
    formData.append("areaid", data.areaid);
    formData.append("storecodes", window.JSON.stringify(data.storecodes));
    formData.append("business_src", data.business_src);
    formData.append("businesscode_src", data.businesscode_src);
    formData.append("account_src", data.account_src);
    formData.append("tax_src", data.tax_src);
    formData.append("legalman_1", data.legalman_1);
    formData.append("legalman_2", data.legalman_2);
    axios.post(`?controller=stores&action=update&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//删除一条基础门店
let delBsOne = (token,id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", id);

    axios.post(`?controller=stores&action=delete&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//获取单个门店的操作记录
let log = (token,id = '') => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", id);
    axios.get(`?controller=stores&action=log&token=${token}&id=${id}`,formData).then((res)=>{
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

export default {getLevel,addLevel,updateLevel,delLevel,getOneLevel,getBsList,getBsOne,updateBsOne,delBsOne,log,area}



