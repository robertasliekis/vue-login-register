<template>
  <div v-if="checkLogin == true" :style="{ marginTop: '50px', width: '50%' }">
    <h2 v-for="user in LoggedInUserInfo" :key="user.id">User {{ user.email }} is logged in</h2>
    <a-descriptions bordered v-for="user in LoggedInUserInfo" :key="user.email">
      <a-descriptions-item label="Email" :span="3">
        {{ user.email }}
      </a-descriptions-item>
      <a-descriptions-item label="Password" :span="3">
        {{ user.password }}
      </a-descriptions-item>
      <a-descriptions-item label="First Name" :span="3">
        {{ user.firstName }}
      </a-descriptions-item>
      <a-descriptions-item label="Last Name" :span="3">
        {{ user.lastName }}
      </a-descriptions-item>
      <a-descriptions-item label="Company" :span="3">
        {{ user.company }}
      </a-descriptions-item>
      <a-descriptions-item label="Phone" :span="3">
        {{ user.phone }}
      </a-descriptions-item>
      <a-descriptions-item label="Country" :span="3">
        {{ user.country }}
      </a-descriptions-item>
      <a-descriptions-item label="Map type" :span="3">
        {{ user.mapType }}
      </a-descriptions-item>
      <a-descriptions-item label="Language" :span="3">
        {{ user.language }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
  <div v-else :style="{ marginTop: '80px' }">
    <h2>You need to log in to see user info</h2>
  </div>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.state.usersArray;
    },
    checkLogin() {
      return this.$store.state.isLoggedIn;
    },
    checkLoginUserId() {
      return this.$store.state.loggedInUserId;
    },
    LoggedInUserInfo: function() {
      const loggedInUserId = this.checkLoginUserId;
      return this.users.filter(function(user) {
        if (user.id === loggedInUserId) {
          return user;
        }
      });
    }
  }
};
</script>
