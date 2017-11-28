import axios from 'axios'

//X1运营方案
let getProject = (token,p) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("redirect", "x1.accountmanage.project");
    formData.append("page", p.page);
    formData.append("pagesize", p.size);

    axios.post(`?controller=admin&action=api&token=${token}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

export default {getProject}
