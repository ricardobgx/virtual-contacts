<template>
  <div class="signup-form">
    <h2>Sign Up</h2>
    <SignFormField
      iconCode="perm_identity"
      fieldType="text"
      fieldPlaceholder="Username"
      v-on:text-changed="updateUsername"
    />
    <SignFormField
      iconCode="mail"
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
    <SignFormField
      iconCode="lock"
      fieldType="password"
      fieldPlaceholder="Confirm password"
      v-on:text-changed="updateConfirmPassword"
    />
    <button class="sign-button signup-button" v-on:click="signUp">
      <p>Sign Up</p>
    </button>
    <router-link to="/signin" class="sign-button signin-button">
      <p>Sign In</p>
    </router-link>
  </div>
</template>
<script>
import SignFormField from "../SignFormField.vue";
import ContactsAPI from "../../../services/api";

export default {
  name: "SignUpForm",
  components: {
    SignFormField,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    updateUsername(text) {
      this.username = text;
    },
    updateEmail(text) {
      this.email = text;
    },
    updatePassword(text) {
      this.password = text;
    },
    updateConfirmPassword(text) {
      this.confirmPassword = text;
    },
    async signUp() {
      await ContactsAPI.post("/users", {
        username: this.username,
        email: this.email,
        password: this.password,
      }).then(
        () => {
          this.$router.push("/verify-email");
        },
        () => {
          window.alert("Ocorreu um erro");
        }
      );
    },
  },
};
</script>
<style scoped>
.signup-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.45);
  border-radius: 5px;
  opacity: 0;
  animation: slideUp 0.3s linear forwards;
}

.signup-form h2 {
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

.signup-button {
  color: #ffffff;
  background: var(--primary-color);
  margin-top: 40px;
}

.signin-button {
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  background: #ffffff;
}

@media (max-width: 500px) {
  .signup-form {
    background: none;
    padding: 0px;
    box-shadow: none;
    width: 100%;
  }
}
</style>
