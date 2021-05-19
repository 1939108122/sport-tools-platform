<template>
    <div class="user-comments-container">
        <ul>
            <li v-for="item in userList" :key="item.userId">
                <p style="margin: 15px 0"><el-tag>用户 {{ item.userName }}</el-tag></p>
                <span style="color:#ff6700">{{item.userComment}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userList: []
        }
    },
    created() {
        this.getUserList();
    },
    methods: {
        getUserList() {
            this.$axios
            .post("http://127.0.0.1:7001/default/user/getUserList")
            .then(res => {
                if (res.data.code === "001") {
                    this.userList = res.data.list;
                }
            })
            .catch(err => {
                return Promise.reject(err);
            });
        }
    }
}
</script>
<style lang="less">
    .user-comments-container {
        padding: 20px;
    }
</style>