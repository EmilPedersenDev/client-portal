<template>
  <div class="admin">
    <div class="admin__form-wrapper">
      <h1>
        Register a company <br />
        to a client
      </h1>
      <form @submit.prevent="submit">
        <div class="form-group justify-content-center">
          <label for="company">Company</label>
          <input
            type="text"
            v-model="model.company"
            class="form-control"
            id="company"
            placeholder="Enter company"
          />
        </div>
        <div class="form-group justify-content-center">
          <label for="client">Client</label>
          <input
            type="text"
            v-model="model.client"
            class="form-control"
            id="client"
            placeholder="Enter client name"
          />
        </div>
        <div class="form-group justify-content-center">
          <label for="ssn">Social Security Number</label>
          <input
            type="text"
            v-model="model.ssn"
            class="form-control"
            id="ssn"
            placeholder="YYYY/MM/DD"
          />
        </div>
        <div class="form-group justify-content-center">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="model.email"
            class="form-control"
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div class="submit-cta">
          <button class="btn btn-outline-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Admin",
  data() {
    return {
      model: {
        company: "",
        client: "",
        ssn: "",
        email: "",
      },
      isCompanySubmitted: false,
    };
  },
  methods: {
    ...mapActions(["addCompany"]),
    async submit() {
      try {
        await this.addCompany(this.model);

        this.isCompanySubmitted = true;
      } catch (err) {
        this.isCompanySubmitted;
        console.error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.admin {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 78px);
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    text-align: center;
    font-size: 30px;
  }
  .admin__form-wrapper {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0px 6px 15px 2px rgba($color: #000000, $alpha: 0.2);
    padding: 50px;
    .form-group {
      margin: 10px 0px 0px;
    }
  }
}
</style>