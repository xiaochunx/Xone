import axios from 'axios'



//查看门店-基础信息

let getFirst = (token,id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("redirect", "x1.store.storeBaseInfo");

    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{

        resolve(res)

    })
  })
};

//查看门店-收款账户
let getSecond = (token,id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("redirect", "x1.store.storeAccount");

    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{

      resolve(res)

    })
  })
};
export default {getFirst,getSecond}



