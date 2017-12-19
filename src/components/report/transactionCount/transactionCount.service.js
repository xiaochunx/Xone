import {axios,get} from '../../utility/communApi'



//获取账号列表
let getAccountList = () => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.accountmanage.accountList");

    formData.append("paymentMethod", '');
    formData.append("paymentChannel", '');
    formData.append("accountName", '');
    formData.append("page", 1);
    formData.append("pagesize", 1000);
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};



let orderCount = (start_time,end_time,store_id,p,export1) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.order.orderCount");
    formData.append("start_time", start_time);
    formData.append("end_time", end_time);
    formData.append("store_id", store_id);

    formData.append("pageCount", p.size);
    formData.append("pageNumber", p.page);
    formData.append("export", export1);
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

export default {getAccountList,orderCount}
