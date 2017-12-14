import {axios,get} from '../../utility/communApi'

//获取门店运行状态列表
let getService = (p,levelid,storename) => {
  return new Promise((resolve, reject) => {
    axios.get(`index.php?controller=service&action=index&token=${get('token')}&levelid=${levelid}&storename=${storename}&page=${p.page}&pagesize=${p.size}`).then((res)=>{
      resolve(res)
    })
  })
};

export default {getService}
