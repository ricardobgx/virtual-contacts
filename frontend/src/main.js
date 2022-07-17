import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./static/routes";
import ContactsAPI from "./services/api";

// Create the router
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Define public pages
  const publicPages = ["/signin", "/signup", "/verify-email"];
  const adminPages = ["/manage-accounts"];

  // Define pages need authorization
  const authRequired = !publicPages.includes(to.path);

  // Define pages need admin authorization
  const adminRequired = adminPages.includes(to.path);

  // Get authorization
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const loggedIn = token && id;

  // Variable to user data
  let user = null;

  // If the user is logged, then get the user data
  if (loggedIn) {
    await ContactsAPI.get(`/users/${id}`, {
      headers: {
        "Auth-Token": token,
      },
    }).then((response) => {
      user = response.data.user;
    });
  }

  if (authRequired && !loggedIn) {
    /**********************************************************
     * Check if the page is being render need authorization
     * and user is not logged in, then redirect to sign in page
     ******************************************************** */
    next({ path: "/signin" });
  } else if ((to.path === "/signin" || to.path === "/signup") && loggedIn) {
    /****************************************************
     * If the user is logged and he is in sign page, then
     * redirect to home page
     ************************************************** */
    next({ path: "/" });
  } else if (adminRequired && !user.isAdmin) {
    /******************************************************
     * If the user is not an admin and he is in a page need
     * admin authorization, then redirect to home page
     **************************************************** */
    next("/");
  } else {
    next();
  }
});

// Create the App
const app = createApp(App);

// Use router in the App
app.use(router);

// Mount the App
app.mount("#app");
