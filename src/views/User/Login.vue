<template>
  <div id="login">
    <h1>Ant Desgin Plus</h1>
    <a-form-model
      ref="ruleForm"
      :rules="rules"
      :model="formInline"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item prop="username">
        <a-input v-model="formInline.username" placeholder="Username">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="password">
        <a-input-password
          v-model="formInline.password"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input-password>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit" class="form_model_btn">
          Log in
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          {
            required: true,
            message: "Please input username",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please input password",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(e) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("user/login", this.formInline)
            .then(() => {
              this.$router.push("/");
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
#login {
  h1 {
    color: #fff;
    text-align: center;
    margin-bottom: 30px;
  }
  .form_model_btn {
    height: 40px;
    width: 100%;
  }
}
</style>
