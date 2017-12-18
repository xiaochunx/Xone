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

export default {getAccountList}
