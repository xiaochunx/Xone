import {axios,get} from '../../utility/communApi'

//
let getLevel = () => {
  return new Promise((resolve, reject) => {
    axios.get(`?controller=level&action=index&token=${get('token')}`).then((res)=>{
      resolve(res)
    })
  })
};



export default {getLevel,}



