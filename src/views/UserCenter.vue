<template>
    <div class="userCenter">
    <!-- Add a static page for my favorite module -->
        <div class="userCenter-header">
        <div class="userCenter-title">
            <i class="el-icon-user" style="color: #ff6700;"></i>
            我的信息
        </div>
        </div>
        <div class="content">
            <li>
                <el-button size="small" type="primary" style="float:right" @click="showEditDialog">修改信息</el-button>
            </li>
            <li><el-tag style="margin-right:20px">平台ID</el-tag>{{userInfo.userId}}</li>
            <li><el-tag style="margin-right:20px">我的名称</el-tag>{{userInfo.userName}}</li>
            <li><el-tag style="margin-right:20px">我的电话</el-tag>{{userInfo.userPhoneNumber}}</li>
            <li>
                <el-tag style="margin-right:20px">我的密码</el-tag>
                <span v-if="showPassword">{{userInfo.password}}</span>
                <span v-else>******</span>
                <el-button size="small" type="primary" style="margin-left:20px" @click="showPassword=!showPassword">
                    <span v-if="!showPassword">显示密码</span>
                    <span v-else>隐藏密码</span>
                </el-button>
            </li>
        </div>
        <el-dialog
            title="修改用户信息"
            :visible.sync="editDialogVisible"
            width="50%" @close="editDialogClosed">
            <!-- 修改信息表格区域 -->
            <el-form ref="editFormRef" :model="editForm" 
            :rules="editFormRules" label-width="70px">
                <el-form-item label="用户名">
                <el-input v-model="editForm.userName" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                <el-input v-model="editForm.password"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="userPhoneNumber">
                <el-input v-model="editForm.userPhoneNumber"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        // 密码的校验方法
        let validatePass = (rule, value, callback) => {
            if (value === "") {
                return callback(new Error("请输入密码"));
            }
            // 密码以字母开头,长度在6-18之间,允许字母数字和下划线
            const passwordRule = /^[a-zA-Z]\w{5,17}$/;
            if (passwordRule.test(value)) {
                return callback();
            } else {
                return callback(
                new Error("字母开头,长度6-18之间,允许字母数字和下划线")
                );
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
            userInfo: {},
            showPassword: false,
            editForm: {},
            // 控制修改用户对话框的显示与隐藏
            editDialogVisible: false,
            editFormRules: {
                userPhoneNumber: [
                { required: true, message: '请输入电话号码', trigger: 'blur' },
                { validator: checkMobile, trigger: 'blur'}
                ],
                password: [
                { required: true, validator: validatePass, trigger: 'blur' },
                ],
            }
        }
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        getUserInfo() {
            this.$axios
            .post("http://127.0.0.1:7001/default/user/getUserInfoByID", {
                userId: this.$store.getters.getUser.user_id
            })
            .then(res => {
                if (res.data.code === "001") {
                    this.userInfo = res.data.userInfo[0]
                }
            })
            .catch(err => {
                return Promise.reject(err);
            });
        },
        // 展示修改用户信息对话框
        showEditDialog() {
            let copyUserInfo = JSON.parse(JSON.stringify(this.userInfo));
            this.editForm = copyUserInfo;
            this.editDialogVisible = true
        },
        // 修改后提交之前进行表单预验证
        editUserInfo() {
            this.$refs.editFormRef.validate( async valid => {
                if (!valid) return
                // 发起请求
                const { data: res } = await this.$axios.post('http://127.0.0.1:7001/admin/user/updateUser', {
                    userId: this.editForm.userId,
                    password: this.editForm.password,
                    userPhoneNumber: this.editForm.userPhoneNumber
                })
                if (res.code !== 200)
                {
                return this.notifyError('更新用户信息失败')
                }
                // 关闭对话框， 刷新列表，提示修改成功
                this.editDialogVisible = false
                this.getUserInfo();
                this.notifySucceed('更新用户信息成功')
            })
        },
        // 修改表单的重置操作
        editDialogClosed() {
        this.$refs.editFormRef.resetFields()
        },
        // 修改用户信息取消按钮
        cancelEdit() {
            this.editForm = {};
            this.editDialogVisible = false;
        }
    }
}
</script>
<style>
.userCenter {
  background-color: #f5f5f5;
}
.userCenter .userCenter-header {
  height: 64px;
  background-color: #fff;
  border-bottom: 2px solid #ff6700;
}
.userCenter .userCenter-header .userCenter-title {
  width: 1225px;
  margin: 0 auto;
  height: 64px;
  line-height: 58px;
  font-size: 28px;
}
.userCenter .content {
  padding: 20px 0;
  width: 1225px;
  margin: 0 auto;
}
.userCenter .content li {
  margin-bottom: 10px;
}
/* 收藏列表为空的时候显示的内容CSS */
.userCenter .userCenter-empty {
  width: 1225px;
  margin: 0 auto;
}
.userCenter .userCenter-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(../assets/imgs/cart-empty.png) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.userCenter .userCenter-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.userCenter .userCenter-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
</style>