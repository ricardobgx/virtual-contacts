<template>
  <div class="new-user-form-background">
    <div class="new-user-form">
      <h2>New user</h2>
      <button class="close-form" v-on:click="closeForm">
        <MaterialIconOutlined code="close" color="" />
      </button>
      <NewUserFormField
        iconCode="perm_identity"
        fieldPlaceholder="Username"
        fieldType="text"
        v-on:text-changed="updateUsername"
      />
      <NewUserFormField
        iconCode="mail"
        fieldPlaceholder="Email"
        fieldType="email"
        v-on:text-changed="updateEmail"
      />
      <NewUserFormField
        iconCode="lock"
        fieldPlaceholder="Password"
        fieldType="password"
        v-on:text-changed="updatePassword"
      />
      <NewUserFormField
        iconCode="lock"
        fieldPlaceholder="Confirm password"
        fieldType="password"
        v-on:text-changed="updateConfirmPassword"
      />
      <button class="create-user-button" v-on:click="createUser">
        <p>Create</p>
      </button>
    </div>
  </div>
</template>
<script>
import NewUserFormField from "./NewUserFormField.vue";
import MaterialIconOutlined from "../App/MaterialIcon.vue";
import UserAPI from "../../services/api";

export default {
  name: "NewUserForm",
  components: {
    NewUserFormField,
    MaterialIconOutlined,
  },
  props: {
    isActive: Boolean,
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
    closeForm() {
      this.username = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.$emit("close-form");
    },
    async createUser() {
      if (
        !this.username.trim() ||
        !this.email.trim() ||
        !this.password.trim() ||
        this.password.indexOf(" ") !== -1
      ) {
        return;
      }

      const token = localStorage.getItem("token");

      await UserAPI.post(
        "/users",
        {
          username: this.username,
          email: this.email,
          password: this.password,
        },
        {
          headers: {
            "Auth-Token": token,
          },
        }
      ).then(() => {
        this.$emit("user-created");
        this.closeForm();
      });
    },
  },
};
</script>
<style scoped>
.new-user-form-background {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.25);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 95;
  opacity: 0;
  animation: fadeIn 0.3s linear forwards;
}

.new-user-form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.45);
  width: 400px;
  color: var(--primary-color);
  position: relative;
}

.new-user-form h2 {
  font-size: 18px;
}

.create-user-button {
  color: #ffffff;
  background: var(--primary-color);
  border-radius: 5px;
  border: none;
  height: 40px;
  width: 350px;
  margin-top: 20px;
  cursor: pointer;
}

.close-form {
  background: var(--primary-color);
  border: none;
  padding: 0;
  position: absolute;
  color: #ffffff;
  top: 20px;
  right: 20px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-form span {
  font-size: 20px;
}
</style>
