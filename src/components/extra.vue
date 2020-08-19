<template> <h1>gera</h1></template>

<script>
export default {
  data: function() {
    return {
      email: "",
      password: "",
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" })
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
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
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
  methods: {
    addUser() {
      const newUser = { email: this.email, password: this.password };
      this.$store.dispatch("addNewUser", newUser);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          const newUser = { email: this.email, password: this.password };
          this.$store.dispatch("addNewUser", newUser);
        }
      });
    },
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    }
  }
};
</script>

<style></style>
