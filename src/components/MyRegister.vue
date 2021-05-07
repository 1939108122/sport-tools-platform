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
        <el-form-item prop="telNumber">
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
                    url: 'http://127.0.0.1:7001/default/user/find',
                    data: {
                        userName: this.RegisterUser.name
                    } 
                }).then(({data}) => {
                    if (data.code == '001')
                    {
                        return callback();
                    }
                    else {
                        return callback(new Error(data.msg));
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
        // 验证手机号的规则
        var checkMobile = (rule, value, cb) => {
            // 验证手机号的正则表达式
            const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if (regMobile.test(value))
            {
                return cb()
            }
            cb(new Error('请输入合法的手机号码！'))
        }
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
                    { validator: checkMobile, trigger: 'blur'}
                ],
                pass: [{ validator: validatePass, trigger: "blur" }],
                confirmPass: [{ validator: validateConfirmPass, trigger: "blur" }]
            }
        }
    },
    methods: {
        Register() {
            this.$refs["ruleForm"].validate(valid => {
                //如果通过校验开始注册
                if (valid) {
                this.$axios
                    .post("http://127.0.0.1:7001/default/user/register", {
                        userName: this.RegisterUser.name,
                        password: this.RegisterUser.pass,
                        userPhoneNumber: this.RegisterUser.telNumber
                    })
                    .then(res => {
                    // “001”代表注册成功，其他的均为失败
                    if (res.data.code === "001") {
                        // 隐藏注册组件
                        this.isRegister = false;
                        // 弹出通知框提示注册成功信息
                        this.notifySucceed(res.data.msg);
                    } else {
                        // 弹出通知框提示注册失败信息
                        this.notifyError(res.data.msg);
                    }
                    })
                    .catch(err => {
                    return Promise.reject(err);
                    });
                } else {
                return false;
                }
            });
        }
    }
}
</script>