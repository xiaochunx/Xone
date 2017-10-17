/**
 * Created by W-Q on 2017/9/21.
 */
import * as types from './type'

export default {
  topHeight({commit}, height){
    commit(types.TOPHEIGHT,height);
  },
  NavPathChange({commit},path){
    commit(types.NAVPATHCHANGE,path);
  }
}
