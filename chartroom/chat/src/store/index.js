import Vue from "vue";
import Vuex from "vuex";
//解析token
import jwt_decode from "jwt-decode";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
  },
  mutations: {
    userInfo(state) {
      let userData = jwt_decode(sessionStorage.getItem("token"));
      state.userInfo = userData.data;
    },
  },
  actions: {},
  modules: {},
});
