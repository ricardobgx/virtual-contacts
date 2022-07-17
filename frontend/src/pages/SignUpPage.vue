<template>
  <div class="signup">
    <img src="../assets/RegisterIllustration.png" />
    <SignUpForm />
  </div>
</template>
<script>
import SignUpForm from "../components/Sign/SignUp/SignUpForm.vue";

export default {
  name: "SignUṕPage",
  components: {
    SignUpForm,
  },
};
</script>
<style scoped>
.signup {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
}

.signup img {
  width: 600px;
  opacity: 0;
  animation: fadeIn 0.3s linear forwards;
}

@media (max-width: 1150px) {
  .signup {
    justify-content: center;
  }

  .signup img {
    display: none;
  }
}
</style>
