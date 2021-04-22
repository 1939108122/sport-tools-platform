<template>
  <div id="register">
    <el-dialog title="注册" width="300px" center :visible.sync="isRegister">
      <el-form
        :model="RegisterUser"
        :rules="rules"
        status-icon
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="请输入账号"
            v-model="RegisterUser.name"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="请输入密码"
            v-model="RegisterUser.pass"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPass">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="请再次输入密码"
            v-model="RegisterUser.confirmPass"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="Register" style="width:100%;">注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
    name: 'MyRegister',
    props: ['register'],
    watch: {
    // 监听父组件传过来的register变量，设置this.isRegister的值
        register: function(val) {
        if (val) {
            this.isRegister = val;
        }
        },
        // 监听this.isRegister变量的值，更新父组件register变量的值
        isRegister: function(val) {
            // if (!val) {
            //         this.$refs["ruleForm"].resetFields();
            //         this.$emit("fromChild", val);
            //     }
            }
    },
    data () {
        return {
            isRegister: false, // 控制注册组件是否显示
            RegisterUser: {
            name: '',
            pass: '',
            confirmPass: ''
            },
            rules: {
                // name: [{ validator: validateName, trigger: "blur" }],
                // pass: [{ validator: validatePass, trigger: "blur" }],
                // confirmPass: [{ validator: validateConfirmPass, trigger: "blur" }]
            }
        }
    },
    methods: {
        Register() {

        }
    }
}
</script>