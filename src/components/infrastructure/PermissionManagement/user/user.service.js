import {axios,get} from '../../../utility/communApi'

//获取组织架构
let getLevel = () => {
  return new Promise((resolve, reject) => {
    axios.get(`index.php?controller=level&action=index&token=${get('token')}`).then((res)=>{
      resolve(res)
    })
  })
};


//返回权限管理页面数据

let getPowerList = (level_id,page) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("level_id", level_id);
    formData.append("page", page);
    axios.post(`index.php?controller=power&action=resultData&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//批量删除账户名
let delBatch = (company_id,id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("company_id", company_id);
    formData.append("id", id);

    axios.post(`index.php?controller=power&action=deleteBatch&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//批量启动/关闭
let settingBatch = (company_id,id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("company_id", company_id);
    formData.append("id", id);

    axios.post(`index.php?controller=power&action=settingBatch&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};


//查看账户拥有的权限
let lookUser = (id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", id);

    axios.post(`index.php?controller=power&action=lookUser&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//修改账户拥有的权限
let editor = (formUser) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", formUser.id);
    formData.append("nickname", formUser.nickname);
    formData.append("phone", formUser.phone);
    formData.append("group_id", formUser.group_id);
    formData.append("role_id", formUser.role_id);
    formData.append("billHuman", formUser.billHuman);
    formData.append("power_id", formUser.power_id);
    formData.append("status", formUser.status);
    axios.post(`index.php?controller=power&action=editor&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//新增账户
let newlyAddAccount = (formUser) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", formUser.id);
    formData.append("nickname", formUser.nickname);
    formData.append("phone", formUser.phone);
    formData.append("group_id", formUser.group_id);
    formData.append("role_id", formUser.role_id);
    formData.append("billHuman", formUser.billHuman);
    formData.append("power_id", formUser.power_id);
    formData.append("status", formUser.status);
    axios.post(`index.php?controller=power&action=newlyAddAccount&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//上传文件
let updateXlsFile = (brandid,fileurl,over) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("brandid", brandid);
    formData.append("fileurl", fileurl);
    formData.append("over", over);
    axios.post(`index.php?controller=stores&action=upload&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

export default {getLevel,getPowerList,delBatch,settingBatch,lookUser,editor,newlyAddAccount,updateXlsFile}



