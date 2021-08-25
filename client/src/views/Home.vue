<template>
  <div class="home">
    <div class="home__wrapper">
      <h1>Name: {{ user.name }}</h1>
      <h2>Social Security: {{ user.personalNumber }}</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" v-for="(header, i) in headers" :key="i">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(company, i) in user.companies" :key="i">
            <td>{{ ++i }}</td>
            <td>{{ company }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
  data() {
    return {
      headers: ["#", "Companies"],
    };
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
  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }
  .home__wrapper {
    box-shadow: 0px 6px 15px 2px rgba($color: #000000, $alpha: 0.2);
    padding: 50px;
    width: 100%;
    max-width: 500px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 30px;
  }
}
</style>
