import {axios,get} from '../../utility/communApi'




//单门店修改状态
let changeStoreStatus = (storeIds,type,is_open) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("storeIds", storeIds);
    formData.append("type", type);
    formData.append("is_open", is_open);
    axios.post(`index.php?controller=store&action=changeStoreStatus&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//批量修改状态
let batchChange = (storeIds,type,is_open) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("storeIds", storeIds);
    formData.append("is_open", is_open);
    axios.post(`index.php?controller=store&action=batchChange&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};


//点击外卖平台映射调用
let getWmData = (storeId) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("storeId", storeId);

    axios.post(`index.php?controller=store&action=getWmData&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//点击保留外卖映射弹窗的信息
let setWmData = (id,auth_accept,send_message) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("auth_accept", auth_accept);
    formData.append("send_message", send_message);
    axios.post(`index.php?controller=store&action=setWmData&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};






export default {changeStoreStatus,batchChange,getWmData,setWmData}
