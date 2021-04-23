<template>
  <div id="register">
    <el-dialog title="注册" width="350px" center :visible.sync="isRegister">
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
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input
            prefix-icon="el-icon-phone"
            placeholder="请输入电话号码"
            v-model="RegisterUser.telNumber"
            clearable
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
            if (!val) {
                this.$refs["ruleForm"].resetFields();
                this.$emit("fromChild", val);
            }
        }
    },
    data () {
        // 用户名的校验方法
        let validateName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("请输入用户名"));
            }
            // 用户名以字母开头,长度在5-16之间,允许字母数字下划线
            const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
            if (userNameRule.test(value)) {
                //判断数据库中是否已经存在该用户名
                this.$axios({
                    method: 'POST',
                    url: 'http://127.0.0.1:7001/default/userFind',
                    data: {
                        userName: this.RegisterUser.name
                    } 
                }).then(({data}) => {
                    if (data.code == 0)
                    {
                        return callback();
                    }
                    else {
                        return callback(new Error(data.message));
                    }
                })
            } else {
                return callback(new Error("字母开头,长度5-16之间,允许字母数字下划线"));
            }
        };
        // 密码的校验方法
        let validatePass = (rule, value, callback) => {
            if (value === "") {
                return callback(new Error("请输入密码"));
            }
            // 密码以字母开头,长度在6-18之间,允许字母数字和下划线
            const passwordRule = /^[a-zA-Z]\w{5,17}$/;
            if (passwordRule.test(value)) {
                if (this.RegisterUser.confirmPass != '')
                {
                    this.$refs.ruleForm.validateField("confirmPass");
                }
                return callback();
            } else {
                return callback(
                new Error("字母开头,长度6-18之间,允许字母数字和下划线")
                );
            }
        };
        // 确认密码的校验方法
        let validateConfirmPass = (rule, value, callback) => {
            if (value === "") {
                return callback(new Error("请输入确认密码"));
            }
            // 校验是否以密码一致
            if (this.RegisterUser.pass != "" && value === this.RegisterUser.pass) {
                return callback();
            } else {
                return callback(new Error("两次输入的密码不一致"));
            }
        };
        return {
            isRegister: false, // 控制注册组件是否显示
            RegisterUser: {
            name: '',
            telNumber: '',
            pass: '',
            confirmPass: ''
            },
            rules: {
                name: [{ validator: validateName, trigger: "blur" }],
                telNumber: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度为11位', trigger: 'blur' }
                ],
                pass: [{ validator: validatePass, trigger: "blur" }],
                confirmPass: [{ validator: validateConfirmPass, trigger: "blur" }]
            }
        }
    },
    methods: {
        Register() {

        }
    }
}
</script>