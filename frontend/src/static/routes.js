import ContactsPage from "../pages/ContactsPage.vue";
import SignInPage from "../pages/SignInPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import VerifyEmailPage from "../pages/VerifyEmailPage.vue";
import ManageAccountsPage from "../pages/ManageAccountsPage.vue";

export const routes = [
  {
    path: "/",
    component: ContactsPage,
  },
  {
    path: "/signin",
    component: SignInPage,
  },
  {
    path: "/signup",
    component: SignUpPage,
  },
  {
    path: "/verify-email",
    component: VerifyEmailPage,
  },
  {
    path: "/manage-accounts",
    component: ManageAccountsPage,
  },
];
