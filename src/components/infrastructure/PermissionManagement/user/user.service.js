import {axios,get} from '../../../utility/communApi'

//获取组织架构
let getLevel = () => {
  return new Promise((resolve, reject) => {
    axios.get(`index.php?controller=level&action=index&token=${get('token')}`).then((res)=>{
      resolve(res)
    })
  })
};

//角色列表
let getRoleList = () => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("name", "");

    formData.append("page", 1);
    formData.append("pagesize", 1000);

    axios.post(`index.php?controller=role&action=roleList&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//获取用户组列表

let getGroupList = (level_id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("level_id", level_id);
    formData.append("page", 1);
    formData.append("pagesize", 1000);
    axios.post(`index.php?controller=power&action=getGroupList&token=${get('token')}`, formData).then((res) => {
      resolve(res)
    })
  })
};

//用户组查看用户
let getUserFromGroup = (group_id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("group_id", group_id);
    axios.post(`index.php?controller=power&action=getUserFromGroup&token=${get('token')}`,formData).then((res)=>{
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
    formData.append("billHuman", window.JSON.stringify(formUser.billHuman) );
    formData.append("power_id", formUser.power_id);
    formData.append("status", formUser.status);
    axios.post(`index.php?controller=power&action=editor&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//新增账户
let newlyAddAccount = (formUser,level_id) => {
  return new Promise((resolve, reject) => {
    console.log(formUser)
    console.log(level_id)

    let formData = new FormData();
    formData.append("nickname", formUser.nickname);
    formData.append("phone", formUser.phone);
    formData.append("group_id", formUser.group_id);
    formData.append("role_id", formUser.role_id.join(','));
    formData.append("billHuman", window.JSON.stringify(formUser.billHuman) );
    formData.append("power_id", formUser.power_id);
    formData.append("status", formUser.status);
    formData.append("level_id", level_id);

    axios.post(`index.php?controller=power&action=newlyAddAccount&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};



export default {getLevel,getRoleList,getGroupList,getUserFromGroup,delBatch,lookUser,editor,newlyAddAccount}



