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
  },
  setPublicLevelId({commit},obj){
    commit(types.PUBLICLEVELID,obj);
  },
  setPermissionLevelId({commit},obj){
    commit(types.PERMISSIONLEVELID,obj);
  },
  setStoreTreeList({commit},obj){
    commit(types.STORETREELIST,obj);
  },
  setShowStoreTree({commit},obj){
    commit(types.SHOWSTORETREE,obj);
  },
  setTreeArr({commit},obj){
    commit(types.TREEARR,obj);
  },
}
