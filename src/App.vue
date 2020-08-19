<template>
  <div id="app">
    <a-layout class="content-wrapper">
      <a-row type="flex" class="header" justify="space-between" align="middle">
        <router-link to="/" class="logo-container">
          <div class="logo-image"></div>
          <div class="logo-text">LinkCalc</div>
        </router-link>

        <a-menu theme="light" mode="horizontal" :default-selected-keys="['2']" :style="{ lineHeight: '64px' }">
          <a-menu-item key="1">
            <router-link to="/contact" @click="menuItemClicked" v-model="picked" class="btn btn-contact">Contact</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/register" class="btn btn-register">Register</router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link to="/" class="">Login</router-link>
          </a-menu-item>
          <a-menu-item key="4">
            <router-link to="/userpage" class="">User</router-link>
          </a-menu-item>
        </a-menu>
        <div :style="{ paddingLeft: '60px' }">
          <div v-if="checkLogin == true">
            <a-button type="primary" @click="logOut">
              Log Out
            </a-button>
          </div>
          <div v-else>
            <a-button type="primary" disabled>
              Log Out
            </a-button>
          </div>
        </div>
      </a-row>
    </a-layout>
    <router-view />
  </div>
</template>

<script>
import router from "./router/index.js";

export default {
  data() {
    return {
      picked: ""
    };
  },

  computed: {
    selectedMenuButton() {
      return this.$store.state.selectedMenuButton.toString();
    },
    checkLogin() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    menuItemClicked() {
      console.log(this.picked);
    },
    logOut() {
      this.$store.dispatch("changeLoginState", false);
      router.push({ name: "login" });
    }
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
  padding: 0 1rem;
  /* background-color: rgb(35, 35, 63); */
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
