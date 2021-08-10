<template>
  <div class="register">
    <div class="register__card">
      <form @submit.prevent="submit">
        <div class="form-group justify-content-center">
          <label for="exampleInputEmail1">Social Number</label>
          <input
            type="text"
            class="col-6 register__social-number form-control"
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
    </div>
  </div>
</template>

<script>
import bankId from "../service/bankId";
export default {
  name: "register",
  data() {
    return {
      ssn: "",
    };
  },
  methods: {
    async submit() {
      console.log("submitted");
      try {
        const login = await bankId.login(this.ssn);
        console.log(login);
      } catch (err) {
        console.log(err.message);
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  min-height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    width: 100%;
  }
  .register__card {
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