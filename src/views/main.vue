<template>
    <div id="app">
        <el-container>
            <el-header>
                <myheader></myheader>
            </el-header>
            <el-container>
                    <left style="background-color: #545c64;"
                          @collapse="leftcollapse"
                    ></left>
                <el-container>
                    <el-main>
                        <bread></bread>
                        <router-view/>
                    </el-main>
                    <el-footer><myfooter></myfooter></el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import {myheader,left,bread,myfooter} from '@/components'
    export default {
        data() {
            return {
                leftW:201,
            };
        },
        methods: {
            leftcollapse(val){
                this.leftW = val ? 65 : 211;
                console.log(this.leftW)
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        components:{
            myheader,
            left,
            bread,
            myfooter,
        },


    }
</script>

<style>
    .el-header{
        padding: 0;
    }

</style>
