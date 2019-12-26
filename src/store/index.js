import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      nickname:'测试VUEX',
      token: window.sessionStorage.getItem('token'),  //存到localStorage中一样
  },
  getters:{
      //对state中的数据进行过滤
      filterList(state,getters){

      },
  },
  mutations: {
      setnickName(state,val){
          state.nickname = val
      },
    settoken: (state, data) => {
          //更改token的值
          state.token = data;
          console.log(data);
          window.sessionStorage.setItem('token', data);
          console.log(window.sessionStorage.getItem('token')+"111")
      },
  },
  actions: {

  },
  modules: {
  }
})
