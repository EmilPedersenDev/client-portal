<template>
  <nav>
    <img src="@/assets/logo.png" alt="logo" />
    <ul>
      <li v-if="isAuthenticated">
        <router-link to="/">Home</router-link>
      </li>
      <li v-if="isAuthenticated">
        <router-link to="/about">About</router-link>
      </li>
      <li v-if="isAuthenticated && isAdmin">
        <router-link to="/admin">Admin</router-link>
      </li>
      <li>
        <button
          class="btn btn-outline-primary"
          v-if="isAuthenticated"
          @click="logout"
        >
          Logout
        </button>
        <button class="btn btn-primary" v-else>Login</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import auth from "../service/bankId";
export default {
  name: "navigation",
  data() {
    return {};
  },
  methods: {
    async logout() {
      await auth.logout();
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "isAdmin"]),
  },
};
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 20px 4px rgba($color: #000000, $alpha: 0.2);
  img {
    height: 100%;
    width: 30px;
  }
  ul {
    display: flex;
    align-items: center;
    margin: 0;
    li {
      list-style-type: none;
      margin-right: 20px;
      a {
        text-decoration: none;
        color: #000;
      }
    }
  }
}
</style>