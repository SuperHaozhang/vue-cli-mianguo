import './message'
import './router'
//import './request'

import Vue from 'vue'

import {
    axios
} from './request'

Vue.mixin({
    methods:{
        $get(url,data){
            var pro = this.$http.get(url,{
                params: data
            });
            //错了走这里
            pro.catch(err=>{
                if(err.message==='Network Error'){
                    this.$fail('服务开小差了，请稍后重试！！！')
                }
            });
            return pro;
        },
        $post(url,data){
            var pro = this.$http.post(url,data);
            //错了走这里
            pro.catch(err=>{
                if(err.message==='Network Error'){
                    this.$fail('服务开小差了，请稍后重试！！！')
                }
            });
            return pro;
        }
    }
});

