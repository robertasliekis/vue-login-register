<template>
  <div class="register-container" :style="{ width: '1000px', marginTop: '50px' }">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item class="input-form" v-bind="formItemLayout" label="E-mail" justify="center" :style="{}" has-feedback>
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
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Password" has-feedback>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                },
                {
                  validator: validateToNextPassword
                }
              ]
            }
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Confirm Password" has-feedback>
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            }
          ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item class="input-form" v-bind="formItemLayout" label="First Name">
        <a-input v-decorator="['firstName']" />
      </a-form-item>
      <a-form-item class="input-form" v-bind="formItemLayout" label="Last Name">
        <a-input v-decorator="['lastName']" />
      </a-form-item>
      <a-form-item class="input-form" v-bind="formItemLayout" label="Company">
        <a-input v-decorator="['company']" />
      </a-form-item>
      <a-form-item class="input-form" v-bind="formItemLayout" label="Phone">
        <a-input v-decorator="['phone']" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Country">
        <a-select v-decorator="['country', { rules: [{ required: true, message: 'Please select your country!' }] }]" placeholder="Please select your country">
          <a-select-option value="usa">
            United States
          </a-select-option>
          <a-select-option value="lithuania">
            Lithuania
          </a-select-option>
          <a-select-option value="italy">
            Italy
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Map type">
        <a-select placeholder="Please select a map type" v-decorator="['mapType', { rules: [{ required: true, message: 'Please select a map type!' }] }]">
          <a-select-option value="google">
            Google
          </a-select-option>
          <a-select-option value="bing">
            Bing
          </a-select-option>
          <a-select-option value="baidu">
            Baidu
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Select your language" :style="{ margin: '0px auto' }">
        <a-select placeholder="Please select your language" v-decorator="['language', { rules: [{ required: true, message: 'Please select a map type!' }] }]">
          <a-select-option value="english">
            English (United States)
          </a-select-option>
          <a-select-option value="lietuviu">
            Lietuvių (Lietuva)
          </a-select-option>
          <a-select-option value="italiano">
            Italiano (Italy)
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-row>
        <a-form-item :style="{ margin: '0px auto' }">
          <a-checkbox
            v-decorator="[
              'unit-system',
              {
                valuePropName: 'checked',
                initialValue: true
              }
            ]"
          >
          </a-checkbox>
          Metric
        </a-form-item>
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
          I agree to the LigoWave <a a href="https://www.ligowave.com/terms-and-conditions/" to="/register" class="link">terms and conditions</a>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">
            Register
          </a-button>
        </a-form-item>
      </a-row>
    </a-form>
    <!-- <div v-for="user in users" :key="user.email">{{ user.id }} {{ user.email }} {{ user.email }} {{ user.password }}</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      confirmDirty: false,
      autoCompleteResult: [],
      userExist: false
    };
  },
  computed: {
    users() {
      return this.$store.state.usersArray;
    },
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 }
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : {};
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const form = this.form;
          if (form.getFieldValue("agree-to-terms")) {
            this.$store.state.usersArray.forEach((user) => {
              if (values.email === user.email) {
                this.userExist = true;
              }
            });
            if (!this.userExist) {
              const userId = new Date().getTime();
              const newUser = {
                id: userId,
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                company: values.company,
                phone: values.phone,
                country: values.country,
                mapType: values.mapType,
                language: values.language
              };
              this.$store.dispatch("addNewUser", newUser);
              this.userCreated();
            } else {
              this.userAlreadyExist();
              this.userExist = false;
            }
          }
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = [".com", ".org", ".net"].map((domain) => `${value}${domain}`);
      }
      this.autoCompleteResult = autoCompleteResult;
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    userCreated() {
      this.$info({
        content: "New user registered!"
      });
    },
    userAlreadyExist() {
      this.$error({
        content: "User with this email already exists!"
      });
    }
  }
};
</script>

<style>
.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-form .form-group label {
  width: 8rem;
}
</style>
