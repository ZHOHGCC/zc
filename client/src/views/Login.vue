<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">机器妈后台</span>
      </div>
      <el-form :model="loginUser"
               :rules="rules"
               ref="loginForm"
               class="loginForm"
               label-width="60px">
        <el-form-item label="账号"
                      prop="account">
          <el-input v-model="loginUser.account"
                    placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="loginUser.password"
                    placeholder="请输入密码"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('loginForm')"
                     class="submit_btn">登 录</el-button>
        </el-form-item>

      </el-form>
    </section>
  </div>
</template>

<script>
// import jwt_decode from "jwt-decode";

export default {
  name: "login",
  data () {
    return {
      loginUser: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          {

            required: true,
            message: "账号不能为空",

          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },

        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let account = this.loginUser.account
          let password = this.loginUser.password
          this.$axios.get("/admin/token", {
            params: {
              account: account,
              password: password
            }
          }).then(res => {
            // 登录成功
            const token = res.data.data;
            localStorage.setItem("eleToken", token);

            // // 解析token 
            // const decode = jwt_decode(token);
            // console.log(decode)
            // // 存储数据
            this.$store.dispatch("setIsAuthenticated", !this.isEmpty(token));
            this.$store.dispatch("setUser", token);

            // // 页面跳转
            this.$router.push("/index");
            console.log(res)
          });
        } else {

          return false;
        }
      });
    },
    isEmpty (value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>


