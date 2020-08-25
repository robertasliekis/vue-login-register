<template>
  <a-row class="contact-form form-style" :style="{ margin: '50px 0', width: '700px' }">
    <h2 :style="{ marginBottom: '20px' }">CONTACTS</h2>

    <a-row type="flex" class="" :style="{ marginBottom: '20px' }" style="flex" justify="center">
      <a-col class="column" :span="12" align="start">
        <a-row :style="{ fontWeight: 'bold' }">USA</a-row>
        <a-row>LigoWave</a-row>
        <a-row>138 Mountain Brook Dr</a-row>
        <a-row>Canton, GA 30115</a-row>
        <a-row>Phone: +1 877 544 6928</a-row>
        <a-row>Phone:+1 877 LIGOWAVE</a-row>
      </a-col>
      <a-col :span="12" align="start">
        <a-row :style="{ fontWeight: 'bold' }">EMEA</a-row>
        <a-row>LigoWave</a-row>
        <a-row>Sauletekio al. 15, 610</a-row>
        <a-row>LT-10244, Vilnius Lithuania</a-row>
        <a-row>Phone:+370 37 211705</a-row>
        <a-row>Phone:+370 37 759006</a-row>
      </a-col>
    </a-row>
    <a-row type="flex" class="" :style="{ marginBottom: '40px' }">
      <a-col class="column" :span="12" align="start">
        <a-row :style="{ fontWeight: 'bold' }">Email:</a-row>
        <a-row>Support: support@ligowave.com</a-row>
        <a-row>Sales: sales@ligowave.com</a-row>
      </a-col>
      <a-col :span="12" align="start">
        <a-row :style="{ fontWeight: 'bold' }">Websites:</a-row>
        <a-row>
          <a href="wwww.Ligwave.com">wwww.Ligwave.com</a>
        </a-row>
        <a-row>
          <a href="www.Deliberant.com">www.Deliberant.com</a>
        </a-row>
      </a-col>
    </a-row>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item class="input-form" v-bind="formItemLayout" label="Name">
        <a-input
          class="input-field"
          placeholder="Name"
          v-decorator="[
            'name',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your name'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item class="input-form" v-bind="formItemLayout" justify="center" label="Email">
        <a-input
          placeholder="Email"
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
      <a-form-item label="Message" v-bind="formItemLayout">
        <a-input
          type="textarea"
          placeholder="Message"
          :style="{ height: '180px' }"
          v-decorator="[
            'message',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your message'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item :style="{ margin: '0px' }">
        <a-button type="primary" html-type="submit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </a-row>
</template>

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
    //Formating form fields
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 }
          }
        : {};
    }
  },
  methods: {
    //Receiving form input and checking for errors
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    }
  }
};
</script>

<style scoped></style>
