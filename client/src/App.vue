<template>
  <div id="app">
    <navigation />
    <router-view />
  </div>
</template>


<script>
import Navigation from "./components/Navigation.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    navigation: Navigation,
  },
  created() {
    if (this.isAuthenticated) {
      this.getUser();
    }
  },
  methods: {
    ...mapActions(["getUser"]),
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
}
</style>
