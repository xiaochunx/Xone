import {axios,get} from '../../utility/communApi'

//下发记录
let issuedData = (p,name) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.invoice.issuedData");
    formData.append("name", name);
    formData.append("page", p.page);
    formData.append("pagesize", p.size);
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//下发记录详情
let issuedDataInfo = (id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.invoice.issuedDataInfo");
    formData.append("id", id);

    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

export default {issuedData,issuedDataInfo}



