<template>
  <div class="home">
    <register />
  </div>
</template>

<script>
// @ is an alias to /src
import Register from "../components/Register.vue";
export default {
  name: "Home",
  components: {
    Register,
  },
};
</script>

<style lang="scss"  scoped>
.home {
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
</style>
