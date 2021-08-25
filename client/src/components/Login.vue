<template>
  <div class="login">
    <div class="login__card">
      <div class="login__bank-id-logo-wrapper">
        <img
          class="login__bank-id-logo"
          src="https://www.bankid.com/assets/logo-bank-id.svg"
          alt=""
        />
      </div>
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
          <button class="btn btn-outline-primary">Logga in med Bank Id</button>
        </div>
      </form>

      <div class="spinner-wrapper" v-if="isLoading">
        <div class="spinner"></div>
      </div>
    </div>
  </div>
</template>

<script>
import bankId from "../service/bankId";
import Cookies from "js-cookie";
import { mapActions, mapState } from "vuex";
export default {
  name: "login",
  data() {
    return {
      ssn: "",
      isLoading: false,
    };
  },

  methods: {
    ...mapActions(["getUser"]),
    async submit() {
      this.isLoading = true;
      try {
        await bankId.login(this.ssn);
        this.isLoading = false;
        this.$store.commit("setToken", Cookies.get("access_token"));
        await this.getUser();

        this.user.role === "Admin"
          ? this.$router.push("/admin")
          : this.$router.push("/");
      } catch (err) {
        this.isLoading = false;
        console.log(err.message);
      }
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 78px);
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
    .login__bank-id-logo-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
      .login__bank-id-logo {
        width: 60px;
        height: 100%;
      }
    }
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
    margin-top: 50px;
  }
}
</style>