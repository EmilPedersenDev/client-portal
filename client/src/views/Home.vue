<template>
  <div class="home">
    <ul>
      <li>Name: {{ user.name }}</li>
      <li>Social Security: {{ user.personalNumber }}</li>
      <li>Companies: {{ user.companies }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// @ is an alias to /src
import Login from "../components/Login.vue";
export default {
  name: "Home",
  components: {
    Login,
  },
  computed: {
    ...mapGetters({ user: "getUser" }),
  },
};
</script>

<style lang="scss"  scoped>
.home {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 78px);
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    margin: 0;
    li {
      list-style-type: none;
    }
  }
}
</style>
