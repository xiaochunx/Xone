import axios from 'axios'

//新增门店标签

let addOne = (token,data,storeIds) => {
  // console.log(data.thirdPartyCoding)
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    let thirdCode = window.JSON.stringify(data.thirdPartyCoding);
    formData.append("redirect", "x1.store.addStoreLabel");

    formData.append("name", data.name);
    formData.append("thirdCode", thirdCode);
    formData.append("storeIds", storeIds);

    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};


export default {addOne}



