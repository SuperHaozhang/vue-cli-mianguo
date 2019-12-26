<template>
    <div class="header" style="padding: 0 20px;background-color: #545c64;display: flex;align-items: center;justify-content: space-between">
        <div class="text-center"  style="color: #fff;"><span class="text-center-body">汉川农产品追溯后台管理</span></div>
        <el-menu
                class="el-menu-demo"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-submenu index="2">
                <template slot="title">{{nickname}}</template>
                <el-menu-item index="2-2" @click="loginOut">退出</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "myheader",
        data(){
            return{
                nickname:sessionStorage.getItem(this.$config.CACHE_KEY.LOGIN_USER_NAME),
            }
        },
        methods:{
            loginOut(){
                this.$go('/login');
                sessionStorage.clear();
            }
        }
    }
</script>

<style >
.header{
    height: 60px;
}
.text-center{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
}
.text-center-body{
    margin-left: 800px;
}
</style>
