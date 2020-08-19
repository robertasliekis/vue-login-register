<template>
  <a-row :style="{ height: 'calc(100vh - 66px)' }" type="flex" align="middle">
    <a-layout-content class="main-layout">
      <a-form id="components-form-login" :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item class="input-container" :style="{ width: '300px' }">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!'
                  }
                ]
              }
            ]"
            placeholder="Email"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item :style="{ width: '300px' }">
          <a-input v-decorator="['password', { rules: [{ required: true, message: 'Please input your Password!' }] }]" type="password" placeholder="Password">
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item class="login-form-links">
          <a-row :style="{ margin: '0px' }"
            >Please login here or
            <span @click="editSelectedMenuButton">
              <router-link to="/register" class="link"> create a new account</router-link>
            </span>
          </a-row>
          <a-row :style="{ margin: '0px' }"
            >Forgot password?
            <span>
              <router-link to="/reminder" class="link"> Click here</router-link>
            </span>
          </a-row>
          <a-form-item :style="{ margin: '0px auto', height: '60px' }">
            <a-checkbox
              v-decorator="[
                'agree-to-terms',
                {
                  valuePropName: 'checked',
                  rules: [{ required: true, message: 'Please agree to terms and conditions' }]
                }
              ]"
            >
            </a-checkbox>
            I agree to the LigoWave <a href="https://www.ligowave.com/terms-and-conditions/" to="/register" class="link">terms and conditions</a>
          </a-form-item>

          <a-button type="primary" html-type="submit" class="login-form-button" :style="{ width: '300px' }">
            Log in
          </a-button>
          <a-row :style="{ marginTop: '50px' }"
            >By using this free tool you understand and agree that you will be receiving e-mails from LigoWave, Deliberant and their authorized channel partners.</a-row
          >
        </a-form-item>
      </a-form>
    </a-layout-content>

    <!-- <div v-for="user in users" :key="user.email">{{ user.id }} {{ user.email }} {{ user.password }}</div> -->
  </a-row>
</template>

<script>
import router from "../router/index.js";

export default {
  data: function() {
    return {
      message: "",
      email: "",
      password: "",
      loggedIn: false,
      visible: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },

  computed: {
    users() {
      return this.$store.state.usersArray;
    },
    checkLogin() {
      return this.$store.state.isLoggedIn;
    },
    LoggedInUserInfo: function() {
      return this.users.filter(function(user) {
        if (user.id === 1) {
          return user;
        }
      });
    },
    checkLoginUserId() {
      return this.$store.state.loggedInUserId;
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const form = this.form;
          if (form.getFieldValue("agree-to-terms")) {
            this.$store.state.usersArray.forEach((user) => {
              if (values.email === user.email && values.password === user.password) {
                this.$store.dispatch("changeLoggedInUserId", user.id);
                this.$store.dispatch("changeLoginState", true);
                this.$store.dispatch("editSelectedMenuButton");
              }
            });
            if (this.checkLogin) {
              router.push({ name: "userpage" });
            } else {
              this.incorrectLoginInfo();
            }
          }
        }
      });
    },
    editSelectedMenuButton() {
      this.$store.dispatch("editSelectedMenuButton");
    },

    showModal() {
      this.visible = true;
    },
    incorrectLoginInfo() {
      this.$error({
        content: "Incorrect email or password!"
      });
    }
  }
};
</script>

<style>
.link {
  text-decoration: none;
  color: orange;
  margin-left: 0.3rem;
}
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-login {
  margin: 1rem 0;
}

.agreement-option {
  margin-bottom: 1rem;
}

#components-form-login .login-form {
  max-width: 500px;
}
#components-form-login .login-form-button {
  width: 100%;
}
</style>
