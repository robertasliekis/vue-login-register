<template>
  <a-row class="register-container" :style="{ width: '700px', margin: '50px 0' }">
    <a-form :form="form" @submit="handleSubmit" class="register-form form-style">
      <h2 :style="{ marginBottom: '20px' }">REGISTER</h2>
      <a-form-item class="input-form " v-bind="formItemLayout" label="E-mail" justify="center" :style="{}" has-feedback>
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
        />
      </a-form-item>
      <a-form-item class="input-form " v-bind="formItemLayout" :style="{ position: 'relative' }" label="Password">
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your Password!' },
                ,
                {
                  validator: validateToNextPassword
                }
              ]
            }
          ]"
          :type="passwordFieldType"
          placeholder="Password"
        >
        </a-input>
        <div :style="{ position: 'absolute', transform: 'translate(-50%,-50%)', right: '0px', top: '50%', fontSize: '16px', cursor: 'pointer' }" class="show-password" @click="showPassword">
          <a-icon type="eye" v-if="passwordFieldType == 'password'" /> <a-icon v-else type="eye-invisible" />
        </div>
      </a-form-item>
      <a-form-item class="input-form " v-bind="formItemLayout" :style="{ position: 'relative' }" label="Confirm password">
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [
                { required: true, message: 'Please input your Password!' },
                ,
                {
                  validator: compareToFirstPassword
                }
              ]
            }
          ]"
          :type="passwordFieldType"
          placeholder="Password"
        >
        </a-input>
        <div :style="{ position: 'absolute', transform: 'translate(-50%,-50%)', right: '0px', top: '50%', fontSize: '16px', cursor: 'pointer' }" class="show-password" @click="showPassword">
          <a-icon type="eye" v-if="passwordFieldType == 'password'" /> <a-icon v-else type="eye-invisible" />
        </div>
      </a-form-item>

      <a-form-item class="input-form" v-bind="formItemLayout" label="First name">
        <a-input v-decorator="['firstName']" placeholder="First name" />
      </a-form-item>
      <a-form-item class="input-form" v-bind="formItemLayout" label="Last name">
        <a-input v-decorator="['lastName']" placeholder="Last name" />
      </a-form-item>
      <a-form-item class="input-form" v-bind="formItemLayout" label="Company">
        <a-input v-decorator="['company']" placeholder="Company" />
      </a-form-item>
      <a-form-item class="input-form" v-bind="formItemLayout" label="Phone">
        <a-input v-decorator="['phone']" placeholder="Phone" />
      </a-form-item>
      <a-form-item class="input-form " v-bind="formItemLayout" label="Country">
        <a-select
          v-decorator="['country', { rules: [{ required: true, message: 'Please select your country!' }] }]"
          show-search
          option-filter-prop="children"
          :filter-option="filterOption"
          placeholder="Select your country"
        >
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
      <a-form-item class="input-form" v-bind="formItemLayout" label="Map type">
        <a-select
          placeholder="Select a map type"
          v-decorator="['mapType', { rules: [{ required: true, message: 'Please select a map type!' }] }]"
          show-search
          option-filter-prop="children"
          :filter-option="filterOption"
        >
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
      <a-form-item class="input-form" v-bind="formItemLayout" label="Language">
        <a-select
          placeholder="Select your language"
          v-decorator="['language', { rules: [{ required: true, message: 'Please select a map type!' }] }]"
          show-search
          option-filter-prop="children"
          :filter-option="filterOption"
        >
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
      <a-form-item class="input-form" v-bind="formItemLayout" label="Units">
        <a-select
          placeholder="Select units"
          v-decorator="['units', { rules: [{ required: true, message: 'Please select units!' }] }]"
          show-search
          option-filter-prop="children"
          :filter-option="filterOption"
        >
          <a-select-option value="metric">
            Metric
          </a-select-option>
          <a-select-option value="imperial">
            Imperial
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-row>
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
        <a-form-item :style="{ margin: '0px ' }">
          <a-button type="primary" html-type="submit">
            Register
          </a-button>
        </a-form-item>
      </a-row>
    </a-form>
  </a-row>
</template>

<script>
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      confirmDirty: false,
      userExist: false,
      passwordFieldType: "password"
    };
  },
  computed: {
    users() {
      return this.$store.state.usersArray;
    },
    //Formating form fields
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 }
          }
        : {};
    }
  },
  methods: {
    //Receiving register form input and checking for errors
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const form = this.form;
          //Checking if user agrees to terms and conditions
          if (form.getFieldValue("agree-to-terms")) {
            this.checkIfUserAlreadyExist(values.email);
            //Display modal popup if user created successfully or if user already exist
            if (!this.userExist) {
              this.createNewUser(values);
            } else {
              this.userAlreadyExist();
              this.userExist = false;
            }
          }
        }
      });
    },
    //Checking if there is a registered user with same email
    checkIfUserAlreadyExist(newUserEmail) {
      this.$store.state.usersArray.forEach((user) => {
        if (newUserEmail === user.email) {
          this.userExist = true;
        }
      });
    },

    //Creates new user and adds to users array
    createNewUser(values) {
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
    //Displays/hides text in password input area
    showPassword() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    },
    //Searching option in drop down input field
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
    //Modal pop up when new user is registered
    userCreated() {
      this.$info({
        content: "New user registered!"
      });
    },
    //Modal pop up when user with same email already exists
    userAlreadyExist() {
      this.$error({
        content: "User with this email already exists!"
      });
    }
  }
};
</script>
<style></style>
