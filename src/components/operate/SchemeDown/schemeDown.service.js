import {axios,get} from '../../utility/communApi'

//X1运营方案
let getProject = () => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.accountmanage.project");

    axios.post(`?controller=stores&action=create&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

export default {getProject}
