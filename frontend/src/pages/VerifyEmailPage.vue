<template>
  <div class="verify-email">
    <div class="activate-alert">
      <h2 class="account-created">Account created!</h2>
      <h3 class="activate-account">
        Verify your mailbox and activate your account
      </h3>
      <router-link class="signin-button" to="/signin">
        <p>Sign In</p>
      </router-link>
    </div>
    <img src="../assets/MailboxIllustration.png" />
  </div>
</template>
<script>
export default {
  name: "VerifyEmailPage",
};
</script>
<style scoped>
.verify-email {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.verify-email img {
  width: 300px;
  margin-left: 50px;
}

.activate-alert {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  margin-right: 50px;
}

.account-created {
  color: var(--primary-color);
  font-size: 30px;
}

.activate-account {
  margin: 20px 0;
  color: #000000;
  font-size: 25px;
  text-align: center;
}

.signin-button {
  height: 40px;
  width: 250px;
  border: none;
  color: #ffffff;
  background: var(--primary-color);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
