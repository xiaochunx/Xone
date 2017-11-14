import axios from 'axios'

let getList =(params)=>{
  return new  Promise((resolve,reject)=>{
    axios.request({
      url: 'index.php?',
      method: 'get',
      // headers: {'token': 'PT201512191013130'},
      params
    }).then((res) => {
      resolve(res)
    });
  })
}

let postTest =(formData)=>{
  return new  Promise((resolve,reject)=>{

    axios.request({
    url: 'http://yk.com:80/posmanage/index.php?controller=user&action=login',
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    withCredentials: false,//true为携带 cookie 信息
    data: formData,
  }).then((res) => {
    console.log(res)
    resolve(res)
  });


})
}




export default {getList,postTest}
