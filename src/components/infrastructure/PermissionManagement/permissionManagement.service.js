import {axios,get} from '../../utility/communApi'

//获取组织架构
let getLevel = () => {
  return new Promise((resolve, reject) => {
    axios.get(`index.php?controller=level&action=index&token=${get('token')}`).then((res)=>{
      resolve(res)
    })
  })
};




//上传文件
let updateXlsFile = (brandid,fileurl,over) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("brandid", brandid);
    formData.append("fileurl", fileurl);
    formData.append("over", over);
    axios.post(`index.php?controller=stores&action=upload&token=${get('token')}`,formData).then((res)=>{
      resolve(res)
    })
  })
};

export default {getLevel,updateXlsFile}



