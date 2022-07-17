<template>
  <NavBar :user="user" :token="token" v-on:get-user="getUser(user.id, token)" />
  <div class="pages">
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/App/NavBar.vue";
import ContactsAPI from "./services/api";

export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {
      user: {
        id: -1,
        username: "",
        email: "",
      },
      token: "",
    };
  },
  methods: {
    async getUser(id, token) {
      await ContactsAPI.get(`/users/${id}`, {
        headers: {
          "Auth-Token": token,
        },
      }).then(
        (response) => {
          this.user = response.data.user;
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  mounted() {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (!token || !id) {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      return;
    }

    this.token = token;

    this.getUser(id, token);
  },
};
</script>

<style>
:root {
  --primary-color: #757bc8;
  --secondary-color: #cccccc;
}

* {
  box-sizing: border-box;
  outline: none;
  text-decoration: none;
  margin: 0;
  font-family: "Secular One", sans-serif;
  font-weight: lighter;
}

body {
  margin: 0;
}

.pages {
  padding-top: 60px;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(10%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

@keyframes slideDown {
  0% {
    transform: translateY(-10%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
</style>
