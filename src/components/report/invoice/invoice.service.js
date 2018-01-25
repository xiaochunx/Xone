import {axios,get} from '../../utility/communApi'



//发票统计列表
let invoiceStatistics = (p,store_id,create_time,end_time,myExport) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("store_id", store_id);
    formData.append("create_time", create_time);
    formData.append("end_time", end_time);
    formData.append("export", myExport);
    formData.append("page", p.page);
    formData.append("pagesize", p.size);
    axios.post(`http://testnewx1.kuan1.cn/posmanage/index.php?controller=invoice&action=invoiceStatistics&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

//发票统计列表
let invoiceInfo = (id) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("id", id);
    axios.post(`http://testnewx1.kuan1.cn/posmanage/index.php?controller=invoice&action=invoiceInfo&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

export default {invoiceStatistics,invoiceInfo}
