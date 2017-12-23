import {axios,get} from '../../utility/communApi'



let orderCount = (start_time,end_time,store_id,store_name,p,export1) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.order.orderCount");
    formData.append("start_time", start_time);
    formData.append("end_time", end_time);
    formData.append("store_id", store_id);
    formData.append("store_name", store_name);
    formData.append("pageCount", p.size);
    formData.append("pageNumber", p.page);
    formData.append("export", export1);
    axios.post(`index.php?controller=admin&action=api&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

export default {orderCount}
