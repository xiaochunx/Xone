import axios from 'axios'

//新增门店

let addStore = (token,data) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("levelid", data.levelid);
    formData.append("type", data.type);
    formData.append("data", window.JSON.stringify(data.levelcodes) );


    axios.post(`?controller=stores&action=create&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};




export default {addStore}



