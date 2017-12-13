import {axios,get} from '../../utility/communApi'

//角色列表
let getRoleList = (p) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("page", p.page);
    formData.append("pagesize", p.size);

    axios.post(`index.php?controller=role&action=roleList&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//保存用户角色

let saveRole = (from) => {
  return new Promise((resolve, reject) => {
    let is_use;
    if(from.status === true){
      is_use = 1
    }else {
      is_use = 2
    }
    let formData = new FormData();
    formData.append("id", from.type);
    formData.append("name", from.name);
    formData.append("is_use", is_use);

    axios.post(`index.php?controller=role&action=saveRole&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};


//删除用户角色

let delRole = (ids) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("ids", ids);

    axios.post(`index.php?controller=role&action=delRole&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};


//获取角色的权限配置
let rolePower = (ids) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("ids", ids);

    axios.post(`index.php?controller=role&action=rolePower&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//保存角色的权限配置
let saveRolePower = (id,powerIds) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("powerIds", powerIds);

    axios.post(`index.php?controller=role&action=saveRolePower&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

export default {getRoleList,saveRole,delRole,rolePower,saveRolePower}



