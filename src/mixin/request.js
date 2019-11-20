import Vue from 'vue';
import axios from 'axios'

var instance = axios.create({
   baseURL:'http://localhost:8888'
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log(`${config.method}了${config.url}，参数：${JSON.stringify(config.data)}`);
    return config;
}, function (error) {
    // 对请求错误做些什么
    console.log();
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log('返回了',response);
    return response;
}, function (error) {
    // 对响应错误做点什么
    console.log(error);
    return Promise.reject(error);
});

Vue.prototype.$http = instance;

export default instance
