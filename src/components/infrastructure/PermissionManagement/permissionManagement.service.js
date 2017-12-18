import {axios, get} from '../../utility/communApi'

//获取组织架构
let getLevel = () => {
  return new Promise((resolve, reject) => {
    axios.get(`index.php?controller=level&action=index&token=${get('token')}`).then((res) => {
      resolve(res)
    })
  })
};

//添加用户组
let newLyGroup = (formGroup, level_id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("name", formGroup.name);
    formData.append("third_code", window.JSON.stringify(formGroup.third_code));
    formData.append("level_id", level_id);
    axios.post(`index.php?controller=power&action=newLyGroup&token=${get('token')}`, formData).then((res) => {
      resolve(res)
    })
  })
};

//编辑用户组
let editorGroup = (formGroup, level_id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("group_id", formGroup.id);
    formData.append("name", formGroup.name);
    formData.append("third_code", window.JSON.stringify(formGroup.third_code));
    formData.append("level_id", level_id);
    axios.post(`index.php?controller=power&action=editorGroup&token=${get('token')}`, formData).then((res) => {
      resolve(res)
    })
  })
};

//删除用户组
let deletGroup = (group_id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("group_id", group_id);

    axios.post(`index.php?controller=power&action=deletGroup&token=${get('token')}`, formData).then((res) => {
      resolve(res)
    })
  })
};


//获取用户组列表

let getGroupList = (p, level_id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("level_id", level_id);
    formData.append("page", p.page);
    formData.append("pagesize", p.size);
    axios.post(`index.php?controller=power&action=getGroupList&token=${get('token')}`, formData).then((res) => {
      resolve(res)
    })
  })
};


//批量启动/关闭
let settingBatch = (id, company_id,type) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("company_id", company_id);
    formData.append("type", type);

    axios.post(`index.php?controller=power&action=settingBatch&token=${get('token')}`, formData).then((res) => {
      resolve(res)
    })
  })
};


//查看账户拥有的权限
let lookUser = (id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", id);

    axios.post(`index.php?controller=power&action=lookUser&token=${get('token')}`, formData).then((res) => {
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
    axios.post(`index.php?controller=power&action=newlyAddAccount&token=${get('token')}`, formData).then((res) => {
      resolve(res)
    })
  })
};

//上传文件
let updateXlsFile = (brandid, fileurl, over) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("brandid", brandid);
    formData.append("fileurl", fileurl);
    formData.append("over", over);
    axios.post(`index.php?controller=stores&action=upload&token=${get('token')}`, formData).then((res) => {
      resolve(res)
    })
  })
};

export default {
  getLevel,
  newLyGroup,
  deletGroup,
  editorGroup,
  getGroupList,
  settingBatch,
  lookUser,
  newlyAddAccount,
  updateXlsFile
}



