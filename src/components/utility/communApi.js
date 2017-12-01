import axios from 'axios'
let get= function(key) {
  return window.JSON.parse(window.localStorage.getItem(key));
};

//左侧组织架构

let getLeft = () => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.store.storeLeft");
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//地区
let getArea = (pid = '') => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("pid", pid);
    axios.post(`index.php?controller=area&action=getAreaList&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

export {getLeft,getArea,get,axios}
