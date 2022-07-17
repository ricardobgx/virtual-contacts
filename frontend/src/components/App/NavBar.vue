<template>
  <div class="navbar">
    <AppLogo />
    <div v-if="!isLogged" class="sign-actions">
      <router-link class="sign-link signin-link" to="/signin">
        <p>Sign In</p>
      </router-link>
      <router-link class="sign-link signup-link" to="/signup">
        <p>Sign Up</p>
      </router-link>
    </div>
    <div v-else class="user-actions">
      <div class="user-info">
        <p class="username">Hi, {{ user.username }}</p>
        <button class="user-info-button" v-on:click="openUser">
          <MaterialIconOutlined code="perm_identity" color="" />
        </button>
      </div>
      <router-link
        v-if="user.isAdmin"
        to="/manage-accounts"
        class="manage-accounts-button"
      >
        <MaterialIconOutlined code="admin_panel_settings" color="" />
      </router-link>
      <button class="logout-button" v-on:click="logout">
        <MaterialIconOutlined code="logout" color="" />
      </button>
    </div>
    <UserDetails
      :isActive="userInfoIsActive"
      :userId="Number(user.id)"
      v-if="userInfoIsActive"
      v-on:close-user="closeUser"
      v-on:edit-user="openEditUserForm"
      v-on:delete-user="logout"
    />
    <EditUserForm
      :isActive="editUserFormIsActive"
      :userId="Number(user.id)"
      v-if="editUserFormIsActive"
      v-on:close-form="closeEditUserForm"
      v-on:user-edited="getUser"
    />
  </div>
</template>
<script>
import AppLogo from "./AppLogo.vue";
import MaterialIconOutlined from "./MaterialIcon.vue";
import UserDetails from "../ManageAccounts/UserDetails.vue";
import EditUserForm from "../ManageAccounts/EditUserForm.vue";

export default {
  name: "NavBar",
  components: {
    AppLogo,
    MaterialIconOutlined,
    UserDetails,
    EditUserForm,
  },
  props: {
    user: Object,
    token: String,
  },
  data() {
    const isLogged = localStorage.getItem("token") ? true : false;
    return {
      isLogged,
      editUserFormIsActive: false,
      userInfoIsActive: false,
    };
  },
  methods: {
    openUser(userId) {
      this.userId = userId;
      this.userInfoIsActive = true;
    },
    closeUser() {
      this.userInfoIsActive = false;
    },
    openEditUserForm() {
      this.editUserFormIsActive = true;
    },
    closeEditUserForm() {
      this.editUserFormIsActive = false;
    },
    getUser() {
      this.$emit("get-user");
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      window.location.reload();
    },
  },
};
</script>
<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--primary-color);
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.45);
  height: 60px;
  padding: 0 40px;
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  z-index: 94;
}

.sign-actions {
  display: flex;
  align-items: center;
}

.sign-link {
  display: flex;
  align-items: center;
  height: 30px;
  border-radius: 5px;
  padding: 0 20px;
}

.signin-link {
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  margin-right: 20px;
}

.signup-link {
  color: #ffffff;
  background: var(--primary-color);
}

.user-actions {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: flex-end;
  margin-right: 15px;
}

.user-info p {
  margin-right: 10px;
}

.user-info span {
  font-size: 30px;
}

.logout-button,
.user-info-button,
.manage-accounts-button {
  height: 30px;
  border: none;
  background: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  cursor: pointer;
}

.manage-accounts-button {
  margin-right: 15px;
}

.manage-accounts-button span {
  font-size: 30px;
}

@media (max-width: 500px) {
  .username {
    display: none;
  }
}
</style>
