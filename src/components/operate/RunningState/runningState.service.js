import axios from 'axios'

//获取门店运行状态列表
let getService = (token,levelid,storename = '') => {
  return new Promise((resolve, reject) => {
    axios.get(`?controller=service&action=index&token=${token}&levelid=${levelid}&storename=${storename}`).then((res)=>{
      resolve(res)
    })
  })
};

export default {getService}
