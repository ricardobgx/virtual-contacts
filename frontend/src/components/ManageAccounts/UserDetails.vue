<template>
  <div class="user-background">
    <div class="user">
      <h2>User</h2>
      <button class="close-form" v-on:click="closeForm">
        <MaterialIconOutlined code="close" color="" />
      </button>
      <div class="user-info">
        <div class="user-info-detail">
          <MaterialIconOutlined code="perm_identity" color="" />
          <p>{{ user.username }}</p>
        </div>
        <div class="user-info-detail">
          <MaterialIconOutlined code="mail" color="" />
          <p>{{ user.email }}</p>
        </div>
      </div>
      <div class="user-actions">
        <button
          class="create-user-button edit-user-button"
          v-on:click="editUser"
        >
          <MaterialIconOutlined code="edit" color="" />
        </button>
        <button
          class="create-user-button delete-user-button"
          v-on:click="deleteUser"
        >
          <MaterialIconOutlined code="delete" color="" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import MaterialIconOutlined from "../App/MaterialIcon.vue";
import UserAPI from "../../services/api";

export default {
  name: "UserDetails",
  components: {
    MaterialIconOutlined,
  },
  props: {
    isActive: Boolean,
    userId: Number,
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    closeForm() {
      this.$emit("close-user");
    },
    async getUser() {
      const token = localStorage.getItem("token");

      await UserAPI.get(`/users/${this.userId}`, {
        headers: {
          "Auth-Token": token,
        },
      }).then((response) => {
        this.user = response.data.user;
      });
    },
    async deleteUser() {
      const token = localStorage.getItem("token");

      await UserAPI.delete(`/users/${this.userId}`, {
        headers: {
          "Auth-Token": token,
        },
      }).then(() => {
        this.$emit("delete-user");
        this.closeForm();
      });
    },
    editUser() {
      this.$emit("edit-user", this.user.id);
      this.closeForm();
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>
<style scoped>
.user-background {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.25);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 95;
  animation: fadeIn 0.3s linear forwards;
}

.user {
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

.user-info {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
}

.user-info-detail {
  display: flex;
  width: 100%;
}

.user-info-detail:nth-child(2) {
  margin-top: 10px;
}

.user-info-detail span {
  margin-right: 10px;
  font-size: 25px;
}

.user-info-detail p {
  font-size: 15px;
}

.user-actions button {
  color: #ffffff;
  border-radius: 5px;
  border: none;
  height: 40px;
  width: calc(50% - 10px);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-actions button span {
  font-size: 20px;
}

.edit-user-button {
  background: var(--primary-color);
}

.delete-user-button {
  background: #e63946;
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

.user-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

@media (max-width: 500px) {
  .user {
    width: calc(100% - 80px);
  }
}
</style>
