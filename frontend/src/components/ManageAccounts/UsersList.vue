<template>
  <div class="users-list">
    <UserCard
      v-for="(user, index) in users"
      v-bind:key="index"
      :user="user"
      :index="index"
      v-on:open-user="openUser"
    />
  </div>
</template>
<script>
import UserCard from "./UserCard.vue";

export default {
  name: "UsersList",
  props: {
    users: Array,
  },
  components: {
    UserCard,
  },
  methods: {
    openUser(userId) {
      this.$emit("open-user", userId);
    },
  },
};
</script>
<style scoped>
.users-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 40px 0;
}
</style>
