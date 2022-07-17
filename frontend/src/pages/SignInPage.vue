<template>
  <div class="signin">
    <img src="../assets/LoginIllustration.png" />
    <SignInForm />
  </div>
</template>
<script>
import SignInForm from "../components/Sign/SignIn/SignInForm.vue";

export default {
  name: "SignInPage",
  components: {
    SignInForm,
  },
};
</script>
<style scoped>
.signin {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
}

.signin img {
  width: 550px;
  opacity: 0;
  animation: fadeIn 0.3s linear forwards;
}

@media (max-width: 1150px) {
  .signin {
    justify-content: center;
  }

  .signin img {
    display: none;
  }
}
</style>
