import {axios,get} from '../../utility/communApi'

//发票方案列表
let getProgrammeList = (p,name) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.invoice.programmeList");
    formData.append("name", name);
    formData.append("page", p.page);
    formData.append("pagesize", p.size);
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};


//查看正在使用门店列表
let getUseStoreList = (id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.invoice.getUseStoreList");
    formData.append("id", id);
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//发票方案详情
let getInvoiceInfo = (id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.invoice.getInvoiceInfo");
    formData.append("id", id);
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//修改方案
let update = (form,purchasers) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    let status ,auto_log;
    if(form.status === true){
      status = 1
    }else {
      status = 0
    }
    if(form.auto_log === true){
      auto_log = 1
    }else {
      auto_log = 0
    }
    formData.append("redirect", "x1.invoice.update");
    formData.append("id", form.id);
    formData.append("name", form.name);
    formData.append("third_code", window.JSON.stringify(form.third_code));
    formData.append("status", status);
    formData.append("auto_log", auto_log);
    formData.append("purchasers", purchasers);
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//新增方案
let add = (form,purchasers) => {
  return new Promise((resolve, reject) => {
    let status ,auto_log;
    if(form.status === true){
      status = 1
    }else {
      status = 0
    }
    if(form.auto_log === true){
      auto_log = 1
    }else {
      auto_log = 0
    }
    let formData = new FormData();
    formData.append("redirect", "x1.invoice.add");
    formData.append("name", form.name);
    formData.append("third_code", window.JSON.stringify(form.third_code) );
    formData.append("status", status);
    formData.append("auto_log", auto_log);

    formData.append("purchasers", purchasers);
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};
//删除方案
let del = (id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.invoice.del");
    formData.append("id", id);
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//获取销售方列表
let getPurchaserList = () => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.invoice.getPurchaserList");
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//下发方案
let issuedInvoice = (id,store_id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.invoice.issuedInvoice");
    formData.append("id", id);
    formData.append("store_id", store_id);
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//标签添加门店时搜索

let searchStore = (areaId ='',storeName = '') => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.store.searchStore");

    formData.append("areaId", areaId);
    formData.append("storeName", storeName);
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

export default {getProgrammeList,getUseStoreList,getInvoiceInfo,update,add,del,getPurchaserList,issuedInvoice,searchStore}



