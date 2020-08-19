<template>
  <a-form :form="form" @submit="handleSubmit" :style="{ marginTop: '50px' }">
    <h1>Password reminder</h1>
    <a-form-item v-bind="formItemLayout" label="E-mail" :style="{ width: '300px' }">
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
    <a-form-item>
      <a-button type="primary" html-type="submit" :style="{ width: '300px' }">
        Remind
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      confirmDirty: false,
      autoCompleteResult: []
    };
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
          }
        : {};
    },
    users() {
      return this.$store.state.usersArray;
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      const users = this.users;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          users.forEach((user) => {
            if (values.email === user.email) {
              this.passwordReminder(user.password);
            }
          });
        }
      });
    },
    passwordReminder(password) {
      this.$info({
        content: "Your password is: " + password
      });
    }
  }
};
</script>
