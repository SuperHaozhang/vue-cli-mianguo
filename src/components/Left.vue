<template>
       <div style="text-color:#fff;height:100%;position: relative;">
           <el-menu
                   ref="headermenu"
                   :unique-opened= "true"
                   background-color="#545c64"
                   text-color="#fff"
                   :default-active="activeIndex"
                   @select="selectitem"
                   @opne="open"
                   class="el-menu-vertical-demo"
                   router
                   :collapse="isCollapse" >
               <el-menu-item index="2" route="/mulu">
                       <i class="el-icon-document"></i>
                       <span slot="title" >农产品目录</span>
               </el-menu-item>
               <el-submenu index="3" >
                   <template slot="title">
                       <i class="el-icon-edit"></i>
                       <span slot="title">农业投入品管理</span>
                   </template>
                   <el-menu-item-group >
                       <el-menu-item index="3-1" route="/nongyao" id="item3-1">农药管理</el-menu-item>
                       <el-menu-item index="3-2" route="/huafei" id="item3-2">化肥管理</el-menu-item>
                       <el-menu-item index="3-3" route="/zhongzi" id="item3-3">种子管理</el-menu-item>
                   </el-menu-item-group>
               </el-submenu>
               <el-menu-item index="4" route="/dangan">
                       <i class="el-icon-tickets"></i>
                       <span slot="title">田间档案</span>
               </el-menu-item>
               <el-menu-item index="5" route="/baogao">
                       <i class="el-icon-printer"></i>
                       <span slot="title">农产品检测报告</span>
               </el-menu-item>
               <el-menu-item index="6" route="/xiaoshou">
                       <i class="el-icon-goods"></i>
                       <span slot="title">农产品销售</span>
               </el-menu-item>
               <el-submenu index="7" >
                   <template slot="title">
                       <i class="el-icon-edit"></i>
                       <span slot="title">主题信息</span>
                   </template>
                   <el-menu-item-group >
                       <el-menu-item index="7-1" route="/jbxx" id="item7-1">基本信息</el-menu-item>
                       <el-menu-item index="7-2" route="/ztjj" id="item7-2">主体简介</el-menu-item>
                       <el-menu-item index="7-3" route="/qyry" id="item7-3">企业人员</el-menu-item>
                   </el-menu-item-group>
               </el-submenu>
               <el-menu-item index="8" route="/zhuisuma">
                       <i class="el-icon-picture"></i>
                       <span slot="title">追溯码生成</span>
               </el-menu-item>
               <el-submenu index="9" >
                   <template slot="title">
                       <i class="el-icon-edit"></i>
                       <span slot="title">系统管理</span>
                   </template>
                   <el-menu-item-group >
                       <el-menu-item index="9-1" route="/xgmm" id="item9-1">修改密码</el-menu-item>
                       <el-menu-item index="9-2" route="/czrz" id="item9-2">操作日志</el-menu-item>
                       <el-menu-item index="9-3" route="/cdgl" id="item9-3">菜单管理</el-menu-item>
                       <el-menu-item index="9-4" route="/jsgl" id="item9-4">角色管理</el-menu-item>
                   </el-menu-item-group>
               </el-submenu>
           </el-menu>
           <i class=" arrow" :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'" @click="isCollapse=!isCollapse"></i>
       </div>
</template>

<script>
    export default {
        name: "Left",
        data(){
            return{
                isCollapse:false,
                activeIndex:"0",
                openmenu: -1,
            }
        },
        methods:{
            open(index){
                this.openmenu=index;
            },
            selectitem(i){
                console.log(i);
                if(!i.includes('-')){
                    this.$refs.headermenu.close(this.openmenu)
                }
            },
        },
        mounted(){
            this.activeIndex = this.$route.meta.index
        },
        watch:{
            isCollapse(newval){
                this.$emit('collapse',newval)
            },

        }
    }
</script>

<style scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.arrow{
    position: absolute;
    left: calc(50 - 25px);
    bottom: 30px;
    width: 30px;
    height: 30px;
    color: white;
    font-size: 30px;
}
</style>
