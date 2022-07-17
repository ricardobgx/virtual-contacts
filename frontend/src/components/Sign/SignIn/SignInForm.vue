<template>
  <div class="signin-form">
    <h2>Sign In</h2>
    <SignFormField
      iconCode="perm_identity"
      fieldType="email"
      fieldPlaceholder="E-mail"
      v-on:text-changed="updateEmail"
    />
    <SignFormField
      iconCode="lock"
      fieldType="password"
      fieldPlaceholder="Password"
      v-on:text-changed="updatePassword"
    />
    <button class="sign-button signin-button" v-on:click="signIn">
      <p>Sign In</p>
    </button>
    <router-link to="/signup" class="sign-button signup-button">
      <p>Sign Up</p>
    </router-link>
  </div>
</template>
<script>
import SignFormField from "../SignFormField.vue";
import ContactsAPI from "../../../services/api";

export default {
  name: "SignInForm",
  components: {
    SignFormField,
  },
  data() {
    return {
      email: String,
      password: String,
    };
  },
  methods: {
    updateEmail(text) {
      this.email = text;
    },
    updatePassword(text) {
      this.password = text;
    },
    async signIn() {
      await ContactsAPI.post("/users/login", {
        email: this.email,
        password: this.password,
      }).then((response) => {
        const { token, id } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        window.location.reload();
      });
    },
  },
};
</script>
<style scoped>
.signin-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.45);
  border-radius: 5px;
  opacity: 0;
  animation: slideDown 0.3s linear forwards;
}

.signin-form h2 {
  font-size: 30px;
  font-weight: lighter;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.sign-button {
  width: 100%;
  margin-top: 10px;
  min-height: 40px;
  border-radius: 5px;
  border: none;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.signin-button {
  color: #ffffff;
  background: var(--primary-color);
  margin-top: 40px;
}

.signup-button {
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  background: #ffffff;
}

@media (max-width: 500px) {
  .signin-form {
    background: none;
    padding: 0px;
    box-shadow: none;
    width: 100%;
  }
}
</style>
