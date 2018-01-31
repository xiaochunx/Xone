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
  showStoreTree: {levelid: '', type: '', showAdd: false},//门店库树状态
  publicLevelId:'',//公众号levelid(没有使用,用了localStorage)
  permissionLevelId:'',//权限levelid
  x1storeLevelId:'',//x1门店列表levelid
  x2storeLevelId:'',//x2门店管理levelid
  printConfLevelId:'',//打印机配置levelid
  runningStateLevelId:'',//终端状态levelid
  pushStateLevelId:'',//推送状态levelid
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
  [types.X1STORELEVELID](state, obj){
    state.x1storeLevelId = obj.levelId
  },
  [types.X2STORELEVELID](state, obj){
    state.x2storeLevelId = obj.levelId
  },
  [types.PRINTCONFLEVELID](state, obj){
    state.printConfLevelId = obj.levelId
  },
  [types.RUNNINGSTATELEVELID](state, obj){
    state.runningStateLevelId = obj.levelId
  },
  [types.PUSHSTATELEVELID](state, obj){
    state.pushStateLevelId = obj.levelId
  },
  [types.STORETREELIST](state, obj){
    state.storeTreeList = obj.list
  },
  [types.SHOWSTORETREE](state, obj){
    state.showStoreTree = obj.obj
  },
  [types.TREEARR](state, obj){
    state.treeArr = obj.obj;
    window.localStorage.setItem('treeArr',window.JSON.stringify(obj.obj))
  },
};

export default {
  state,
  getters,
  mutations
}
