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
  publicTree:[],//公众号树
  publicLevelId:'',//公众号levelid(没有使用,用了localStorage)
  permissionTree:[],//用户组管理树
  permissionLevelId:'',//用户组管理levelid
  x1storeTree:[],//x1门店管理树
  x1storeLevelId:'',//x1门店列表levelid
  x2storeTree:[],//x2门店管理树
  x2storeLevelId:'',//x2门店管理levelid
  printConfTree:[],//打印机配置树
  printConfLevelId:'',//打印机配置levelid
  runningStateTree:[],//终端状态树
  runningStateLevelId:'',//终端状态levelid
  pushStateTree:[],//推送状态树
  pushStateLevelId:'',//推送状态levelid
  businessConfTree:[],//商户配置树
  businessConfLevelId:'',//商户配置levelid
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
  [types.BUSINESSCONFLEVELID](state, obj){
    state.businessConfLevelId = obj.levelId
  },
  [types.SHOWSTORETREE](state, obj){
    state.showStoreTree = obj.obj
  },
  [types.TREEARR](state, obj){
    state.treeArr = obj.obj;
    window.localStorage.setItem('treeArr',window.JSON.stringify(obj.obj))
  },
  [types.STORETREELIST](state, obj){
    state.storeTreeList = obj.list
  },
  [types.PERMISSIONTREE](state, obj){
    state.permissionTree = obj.list
  },
  [types.BUSINESSCONFTREE](state, obj){
    state.businessConfTree = obj.list
  },
  [types.PUSHSTATETREE](state, obj){
    state.pushStateTree = obj.list
  },
  [types.RUNNINGSTATETREE](state, obj){
    state.runningStateTree = obj.list
  },
  [types.PRINTCONFTREE](state, obj){
    state.printConfTree = obj.list
  },
  [types.X2STORETREE](state, obj){
    state.x2storeTree = obj.list
  },
  [types.X1STORETREE](state, obj){
    state.x1storeTree = obj.list
  },
  [types.PUBLICTREE](state, obj){
    state.publicTree = obj.list
  },
};

export default {
  state,
  getters,
  mutations
}
