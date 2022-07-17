<template>
  <div class="users-actions">
    <button class="new-user-button" v-on:click="openForm">
      <p>New user</p>
      <MaterialIconOutlined code="add" color="" />
    </button>
    <div class="search-users">
      <input
        type="text"
        name=""
        id=""
        placeholder="Search users"
        v-model="username"
      />
      <p class="search-users-icon">
        <MaterialIconOutlined code="search" color="" />
      </p>
    </div>
  </div>
</template>
<script>
import MaterialIconOutlined from "../App/MaterialIcon.vue";

export default {
  name: "UsersActions",
  components: {
    MaterialIconOutlined,
  },
  data() {
    return {
      username: "",
    };
  },
  methods: {
    openForm() {
      this.$emit("open-form");
    },
  },
  watch: {
    username(text) {
      if (text.trim()) {
        this.$emit("search-users", text);
      } else {
        this.$emit("clear-search");
      }
    },
  },
};
</script>
<style scoped>
.users-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.new-user-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  background: var(--primary-color);
  padding: 0 20px;
  font-size: 15px;
  min-width: max-content;
  margin-right: 20px;
  cursor: pointer;
}

.new-user-button p {
  margin-right: 10px;
}

.new-user-button span {
  font-size: 20px;
}

.search-users {
  display: flex;
  width: 500px;
  align-items: center;
  height: 40px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.45);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.search-users input {
  padding: 5px 10px;
  border: none;
  font-size: 15px;
  background: none;
  width: 100%;
  color: var(--primary-color);
}

.search-users input::placeholder {
  color: var(--secondary-color);
}

.search-users-icon {
  height: 40px;
  width: 40px;
  background: none;
  border: none;
  color: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-users-icon span {
  font-size: 25px;
}

@media (max-width: 950px) {
  .search-users {
    position: relative;
    width: 100%;
    left: unset;
    transform: unset;
  }
}

@media (max-width: 600px) {
  .new-user-button p {
    display: none;
  }
}
</style>
