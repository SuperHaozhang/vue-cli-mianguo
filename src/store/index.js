import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      nickname:'测试VUEX'
  },
  getters:{
      //对state中的数据进行过滤
      filterList(state,getters){

      },
  },
  mutations: {
      setnickName(state,val){
          state.nickname = val
      }
  },
  actions: {

  },
  modules: {
  }
})
