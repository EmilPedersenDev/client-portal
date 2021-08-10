import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: Cookies.get("access_token") || "",
  },
  actions: {},
  mutations: {
    setToken: (state, payload) => {
      state.token = Cookies.get("access_token");
    },
  },
  getters: {},
});
