import axios from 'axios'

//左侧组织架构

let getLeft = (token) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.store.storeLeft");
    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{
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

export default {getLeft,area}
