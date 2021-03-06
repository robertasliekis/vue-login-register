import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usersArray: [
      {
        id: 1,
        email: "admin@website.com",
        password: "123456",
        firstName: "John",
        lastName: "Gill",
        company: "Travel int",
        phone: "+3178461645",
        country: "United States",
        mapType: "Google",
        language: "English(United States)"
      },
      {
        id: 2,
        email: "user@website.com",
        password: "123456",
        firstName: "Peter",
        lastName: "Till",
        company: "Global int",
        phone: "+3178461645",
        country: "United States",
        mapType: "Google",
        language: "English(United States)"
      },
      {
        id: 4,
        email: "123@123.lt",
        password: "123",
        firstName: "Garret",
        lastName: "Hill",
        company: "Global int",
        phone: "+3178461645",
        country: "United States",
        mapType: "Google",
        language: "English(United States)"
      }
    ],
    selectedMenuButton: 3,
    isLoggedIn: false,
    loggedInUserId: null
  },
  mutations: {
    addNewUser(state, user) {
      state.usersArray.push(user);
    },
    changeLoginState(state, loginState) {
      state.isLoggedIn = loginState;
    },
    changeLoggedInUserId(state, userId) {
      state.loggedInUserId = userId;
    },
    //Changes highlighted menu button in navbar, depending on current url
    editSelectedMenuButton(state) {
      const url = window.location.pathname;
      var menuButton;
      switch (url) {
        case "/":
          menuButton = 3;
          break;
        case "/register":
          menuButton = 2;
          break;
        case "/userpage":
          menuButton = 5;
          break;
        case "/contact":
          menuButton = 1;
          break;
        default:
          menuButton = "";
      }
      state.selectedMenuButton = menuButton;
    }
  },

  actions: {
    addNewUser(context, user) {
      context.commit("addNewUser", user);
    },
    changeLoginState(context, loginState) {
      context.commit("changeLoginState", loginState);
    },
    changeLoggedInUserId(context, loginState) {
      context.commit("changeLoggedInUserId", loginState);
    },
    editSelectedMenuButton(context) {
      context.commit("editSelectedMenuButton");
    }
  }
});
