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
<!--               <el-menu-item index="1" route="/">
                   <i class="el-icon-s-home"></i>
                   <span slot="title">工作平台</span>
               </el-menu-item>-->
               <el-submenu index="2">
                   <template slot="title">
                       <i class="el-icon-location"></i>
                       <span slot="title">首页管理</span>
                   </template>
                   <el-menu-item-group >
                       <el-menu-item index="2-1" route="/index" id="item">首页图片</el-menu-item>
                       <el-menu-item index="2-2" route="/case" id="item1">案例图片</el-menu-item>
                       <el-menu-item index="2-3" route="/member" id="item4">会员图片</el-menu-item>
                   </el-menu-item-group>
               </el-submenu>
               <el-submenu index="3">
                   <template slot="title">
                       <i class="el-icon-location"></i>
                       <span slot="title">内容管理</span>
                   </template>
                   <el-menu-item-group >
                       <!--<el-menu-item index="3-3" route="/active" id="item5">动态管理</el-menu-item>-->
                       <el-menu-item index="3-1" route="/article" id="item2">动态管理</el-menu-item>
                       <el-menu-item index="3-2" route="/active" id="item13">线下活动</el-menu-item>
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