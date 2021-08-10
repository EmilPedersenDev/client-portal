<template>
  <div class="login">
    <div class="login__card">
      <form @submit.prevent="submit">
        <div class="form-group justify-content-center">
          <label for="exampleInputEmail1">Social Number</label>
          <input
            type="text"
            class="col-6 login__social-number form-control"
            v-model="ssn"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="YYYYMMDDXXXX"
          />
        </div>
        <div class="submit-cta">
          <button class="btn btn-dark">Logga in med Bank Id</button>
        </div>
      </form>
      <router-link class="login-link" to="/login"
        >Har redan ett konto?</router-link
      >
      <div class="spinner-wrapper" v-if="isLoading">
        <div class="spinner"></div>
      </div>
    </div>
  </div>
</template>

<script>
import bankId from "../service/bankId";
export default {
  name: "login",
  data() {
    return {
      ssn: "",
      isLoading: false,
    };
  },

  methods: {
    async submit() {
      this.isLoading = true;
      try {
        const login = await bankId.login(this.ssn);
        this.isLoading = false;
        this.$store.commit("setToken");
        this.$router.push("/about");
      } catch (err) {
        this.isLoading = false;
        console.log(err.message);
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    width: 100%;
  }
  .login__card {
    position: relative;
    width: 100%;
    max-width: 500px;
    padding: 50px;
    box-shadow: 0px 3px 15px 1px rgba($color: #000000, $alpha: 0.2);
    border-radius: 5px;
    .login-link {
      position: absolute;
      bottom: 5px;
      right: 5px;
      font-size: 12px;
    }
  }

  .submit-cta {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>