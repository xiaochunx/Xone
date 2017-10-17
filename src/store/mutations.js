/**
 * Created by W-Q on 2017/9/21.
 */
import getters from './getters'
import * as types from './type'

const state = {
  height: 0,
  navPath: []
};

const mutations = {
  [types.TOPHEIGHT](state, height){
    state.height = height;
  },
  [types.NAVPATHCHANGE](state,path){
    state.navPath = path;
  }
};

export default {
  state,
  getters,
  mutations
}
