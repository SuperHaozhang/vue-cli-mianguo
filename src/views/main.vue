<template>
    <div id="app">
        <myheader></myheader>
        <section style="display: flex;flex: 1;">
            <left style="background-color: #545c64;"
                  @collapse="leftcollapse"
            ></left>
            <article :style="{width:'calc(100vw - '+ leftW +'px)'}"
                     style="flex: 1;padding: 10px;box-sizing: border-box" >
                <bread></bread>
                <router-view/>
            </article>
        </section>
    </div>
</template>

<script>
    import {myheader,left,bread} from '@/components'
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
        },


    }
</script>

<style>


</style>
