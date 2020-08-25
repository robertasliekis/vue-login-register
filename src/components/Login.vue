<template>
  <a-row :style="{ height: 'calc(100vh - 70px)' }" type="flex" align="middle">
    <a-layout-content class="main-layout">
      <a-form id="components-form-login" :form="form" class="login-form form-style" @submit="handleSubmit" :layout="formLayout">
        <h2 :style="{ marginBottom: '20px' }">USER LOGIN</h2>

        <a-form-item :style="{ width: '500px' }" label="E-mail" v-bind="formItemLayout">
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
        <a-form-item :style="{ width: '500px', position: 'relative' }" label="Password" v-bind="formItemLayout">
          <a-input v-decorator="['password', { rules: [{ required: true, message: 'Please input your Password!' }] }]" :type="passwordFieldType" placeholder="Password">
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
          <div :style="{ position: 'absolute', transform: 'translate(-50%,-50%)', right: 0, top: '50%', fontSize: '16px', cursor: 'pointer' }" class="show-password" @click="showPassword">
            <a-icon type="eye" v-if="passwordFieldType == 'password'" /> <a-icon v-else type="eye-invisible" />
          </div>
        </a-form-item>
        <a-form-item class="login-form-links" :style="{ margin: '0px' }">
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

          <a-row type="flex" justify="center">
            <a-col :span="14">
              <a-button type="primary" html-type="submit" class="login-form-button" :style="{ marginBottom: '20px' }">
                Log in
              </a-button>
            </a-col>
          </a-row>

          <a-row :style="{ margin: '0px' }" type="flex" justify="center">
            <a-col @click="editSelectedMenuButton" :span="7" :style="{ textAlign: 'start' }">
              <router-link to="/register" class="link"> Register</router-link>
            </a-col>
            <a-col :span="7" :style="{ textAlign: 'end' }">
              <router-link to="/reminder" class="link"> Forgot password</router-link>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-layout-content>
  </a-row>
</template>

<script>
import router from "../router/index.js";

export default {
  data: function() {
    return {
      loggedIn: false,
      visible: false,
      formLayout: "horizontal",
      passwordFieldType: "password"
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
    //Formating form fields
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 }
          }
        : {};
    }
  },
  methods: {
    //Receiving login form input and checking for errors
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const form = this.form;
          //Checking if user agrees to terms and conditions
          if (form.getFieldValue("agree-to-terms")) {
            //Checking if user's email and password are valid
            this.$store.state.usersArray.forEach((user) => {
              if (values.email === user.email && values.password === user.password) {
                this.$store.dispatch("changeLoggedInUserId", user.id);
                this.$store.dispatch("changeLoginState", true);
                this.$store.dispatch("editSelectedMenuButton");
              }
            });
            //If login is successful user will be redirected to user page, else receive error message
            if (this.checkLogin) {
              router.push({ name: "userpage" });
            } else {
              this.incorrectLoginInfo();
            }
          }
        }
      });
    },
    //Displays/hides text in password input area
    showPassword() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    },
    //Changes highlighted menu button in navbar
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

.form-style {
  border: 1px solid rgb(223, 223, 223);
  background-color: rgb(252, 252, 252);
  border-radius: 20px;
  padding: 40px 60px !important;
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
