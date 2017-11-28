import axios from 'axios'

//X1运营方案
let getProject = (token) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.accountmanage.project");

    axios.post(`?controller=stores&action=create&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

export default {getProject}
