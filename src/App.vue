<template>
  <div id="app">
    <a-layout class="content-wrapper">
      <a-row type="flex" class="header" justify="space-between" align="middle">
        <router-link to="/" class="logo-container">
          <div class="logo-image"></div>
          <div class="logo-text">LinkCalc</div>
        </router-link>

        <a-menu theme="light" mode="horizontal" @click="editSelectedMenuButton" :default-selected-keys="[selectedMenuButton]" :selected-keys="[selectedMenuButton]" :style="{ lineHeight: '64px' }">
          <a-menu-item key="1">
            <router-link to="/contact" class="btn btn-contact">Contact</router-link>
          </a-menu-item>
          <a-menu-item key="2" v-if="checkLogin == false">
            <router-link to="/register" class="btn btn-register">Register</router-link>
          </a-menu-item>
          <a-menu-item key="5" v-if="checkLogin == true">
            <router-link to="/userpage" class="">User</router-link>
          </a-menu-item>
          <a-menu-item key="3" v-if="checkLogin == false">
            <router-link to="/" class="">Login</router-link>
          </a-menu-item>
          <a-menu-item key="4" v-else @click="logOut">
            Log Out
          </a-menu-item>
        </a-menu>
      </a-row>
    </a-layout>
    <router-view />
  </div>
</template>

<script>
import router from "./router/index.js";

export default {
  computed: {
    //Return highlighted menu button in navbar
    selectedMenuButton() {
      return this.$store.state.selectedMenuButton.toString();
    },
    checkLogin() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("changeLoginState", false);
      router.push({ name: "login" });
    },
    //Changes highlighted menu button in navbar
    editSelectedMenuButton() {
      this.$store.dispatch("editSelectedMenuButton");
    }
  },
  mounted: function() {
    const checkLogin = this.checkLogin;
    this.$nextTick(function() {
      const url = window.location.pathname;
      //Redirects user to login page if user is not logged and tries to access user info page
      if (url === "/userpage" && checkLogin === false) {
        router.push({ name: "login" });
        //Redirects user to login page if user is logged and tries to password reminder page
      } else this.editSelectedMenuButton();
      if (url === "/reminder" && checkLogin === true) {
        router.push({ name: "login" });
      }
    });
  },
  updated: function() {
    this.editSelectedMenuButton();
  }
};
</script>

<style>
#app {
  width: 100%;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.header {
  padding-left: 16px;
  background-color: rgb(252, 252, 252);
  border-bottom: 1px solid rgb(223, 223, 223);
}
.logo-container {
  display: flex;
  align-items: center;
}

.logo-image {
  width: 3rem;
  height: 3rem;
  background-image: url("./images/ligowave-logo.png");
  background-size: cover;
  background-position: center;
}

.logo-text {
  font-size: 1.5rem;
  margin-left: 0.5rem;
  color: rgb(0, 0, 0);
}

.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}

.content-wrapper {
  width: 100%;
}
.navbar {
  display: flex;
  justify-content: space-between;
  background-color: rgb(224, 224, 224);
  width: 100%;
}
</style>
