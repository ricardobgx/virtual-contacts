<template>
  <router-link to="/" class="logo">
    <MaterialIcon code="contacts"></MaterialIcon>
    <h2>Contacts</h2>
  </router-link>
</template>
<script>
import MaterialIcon from "./MaterialIcon.vue";

export default {
  name: "AppLogo",
  components: {
    MaterialIcon,
  },
};
</script>
<style scoped>
.logo {
  display: flex;
  align-items: center;
  color: var(--primary-color);
}
.logo h2 {
  font-size: 18px;
  margin-left: 10px;
}
.logo span {
  font-size: 24px;
}
</style>
