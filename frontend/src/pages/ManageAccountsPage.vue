<template>
  <div class="users">
    <UsersActions
      v-on:open-form="openNewUserForm"
      v-on:search-users="searchUsers"
      v-on:clear-search="clearUsersSearch"
    />
    <NewUserForm
      :isActive="newUserFormIsActive"
      v-if="newUserFormIsActive"
      v-on:close-form="closeNewUserForm"
      v-on:user-created="getUsers"
    />
    <EditUserForm
      :isActive="editUserFormIsActive"
      :userId="Number(userId)"
      v-if="editUserFormIsActive"
      v-on:close-form="closeEditUserForm"
      v-on:user-edited="getUsers"
    />
    <UserDetails
      :isActive="userInfoIsActive"
      :userId="Number(userId)"
      v-if="userInfoIsActive"
      v-on:close-user="closeUser"
      v-on:edit-user="openEditUserForm"
      v-on:delete-user="getUsers"
    />
    <UsersList :users="users" v-on:open-user="openUser" />
  </div>
</template>
<script>
import UsersActions from "../components/ManageAccounts/UsersActions.vue";
import NewUserForm from "../components/ManageAccounts/NewUserForm.vue";
import EditUserForm from "../components/ManageAccounts/EditUserForm.vue";
import UsersList from "../components/ManageAccounts/UsersList.vue";
import UsersAPI from "../services/api";
import UserDetails from "../components/ManageAccounts/UserDetails.vue";

export default {
  name: "UsersPage",
  components: {
    UsersActions,
    NewUserForm,
    EditUserForm,
    UsersList,
    UserDetails,
  },
  data() {
    return {
      newUserFormIsActive: false,
      editUserFormIsActive: false,
      userInfoIsActive: false,
      users: [],
      allUsers: [],
      userId: -1,
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    openNewUserForm() {
      this.newUserFormIsActive = true;
    },
    closeNewUserForm() {
      this.newUserFormIsActive = false;
    },
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
    searchUsers(text) {
      this.users = this.allUsers.filter(
        (user) => user.username.toUpperCase().indexOf(text.toUpperCase()) !== -1
      );
    },
    clearUsersSearch() {
      this.users = [...this.allUsers];
    },
    sortUsers(users) {
      return users.sort((userA, userB) => {
        if (userA.username.toUpperCase() < userB.username.toUpperCase()) {
          return -1;
        } else if (
          userA.username.toUpperCase() > userB.username.toUpperCase()
        ) {
          return 1;
        }
        return 0;
      });
    },
    async getUsers() {
      const token = localStorage.getItem("token");

      await UsersAPI.get("/users", {
        headers: {
          "Auth-Token": token,
        },
      }).then((response) => {
        const users = this.sortUsers(response.data.users);

        this.users = [...users];
        this.allUsers = [...users];
      });
    },
  },
};
</script>
<style scoped>
.users {
  display: flex;
  flex-direction: column;
  padding: 40px;
}
</style>
