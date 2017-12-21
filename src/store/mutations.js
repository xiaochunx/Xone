/**
 * Created by W-Q on 2017/9/21.
 */
import getters from './getters'
import * as types from './type'

const state = {
  height: 0,
  navPath: [],
  isLoading: false,
  treeArr:{},//页面权限
  storeTreeList:[],//门店库树
  showStoreTree: {levelid: -1, type: '', showAdd: false},////门店库树状态
  publicLevelId:-1,//公众号levelid
  permissionLevelId:-1,//权限levelid
};

const mutations = {
  [types.TOPHEIGHT](state, height){
    state.height = height;
  },
  [types.NAVPATHCHANGE](state,path){
    state.navPath = path;
  },
  [types.UPDATELOADINGSTATUS](state, payload) {
    state.isLoading = payload.isLoading
  },
  [types.PUBLICLEVELID](state, obj){
    state.publicLevelId = obj.levelId
  },
  [types.PERMISSIONLEVELID](state, obj){
    state.permissionLevelId = obj.levelId
  },
  [types.STORETREELIST](state, obj){
    state.storeTreeList = obj.list
  },
  [types.SHOWSTORETREE](state, obj){
    state.showStoreTree = obj.obj
  },
  [types.TREEARR](state, obj){
    state.treeArr = obj.obj
  },
};

export default {
  state,
  getters,
  mutations
}
