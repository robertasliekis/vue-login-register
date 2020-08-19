import Vue from "vue";
import Router from "vue-router";
import Register from "@/components/Register";
import Contact from "@/components/Contact";
import Login from "@/components/Login";
import UserPage from "@/components/UserPage";
import Reminder from "@/components/Reminder";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      name: "login",
      path: "/",
      component: Login
    },
    {
      name: "userpage",
      path: "/userpage",
      component: UserPage
    },
    {
      name: "register",
      path: "/register",
      component: Register
    },

    {
      name: "contact",
      path: "/contact",
      component: Contact
    },
    {
      name: "reminder",
      path: "/reminder",
      component: Reminder
    }
  ]
});
