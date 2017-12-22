/**
 * Created by W-Q on 2017/9/21.
 */
export default{
  // 测试方法,开发时可以删除
  getData(state, getters, rootState){
    return state.data;
  },
  getTopHeight(state){
    return state.height;
  },
  getNavPath(state){
    return state.navPath;
  },
  // 获取isLoading状态
  getLoadingStatus(state){
    return state.isLoading;
  },
  getPublicLevelId(state){
    return state.publicLevelId;
  },
  getPermissionLevelId(state){
    return state.permissionLevelId;
  },
  getStoreTreeList(state){
    return state.storeTreeList;
  },
  getShowStoreTree(state){
    return state.showStoreTree;
  },
  getTreeArr(state){
    //需要打印才能正常return
     console.log(state.treeArr)
    // return state.treeArr;
    return window.JSON.parse(window.localStorage.getItem('treeArr'));
  },
}
