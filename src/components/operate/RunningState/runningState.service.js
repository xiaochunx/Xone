import {axios,get} from '../../utility/communApi'

//获取门店运行状态列表
let getService = (levelid,storename = '') => {
  return new Promise((resolve, reject) => {
    axios.get(`?controller=service&action=index&token=${get('token')}&levelid=${levelid}&storename=${storename}`).then((res)=>{
      resolve(res)
    })
  })
};

export default {getService}
