import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";
import jwtDecode from "vue-jwt-decode";
import api from "../service/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: Cookies.get("access_token") || "",
  },
  actions: {
    getUser: async ({ commit, state }) => {
      try {
        const { _id } = jwtDecode.decode(state.token);

        const { data } = await api.get(`/user/${_id}`);

        if (!data) {
          throw new Error("No user was provided.");
        }

        commit("setUser", data);
      } catch (err) {
        throw err;
      }
    },
  },
  mutations: {
    setToken: (state, payload) => {
      state.token = payload;
    },
    setUser: (state, payload) => {
      state.user = Object.assign({}, payload);
    },
  },
  getters: {
    isAuthenticated: (state) => {
      return !!state.token;
    },
    getUser: (state) => {
      return state.user;
    },
  },
});
