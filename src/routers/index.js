import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)

/*import userlist from '../views/user/userlist.vue'*/

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/account/login.vue'), //异步加载组件，需要时点开再加载该组件
        meta: {
            title: '登录',
            anonymous: true
        }
    },
    {
        path: '/',
        name: 'main',
        component: () => import('../views/main.vue'), //异步加载组件，需要时点开再加载该组件,
        children:[
            {
                path: '/',
                name: 'about',
                component: () => import('../views/home.vue'), //异步加载组件，需要时点开再加载该组件
                meta:{
                    title: '详情页',
                    index : '1',

                }
            },
            {
                path: '/userlist',
                name: 'userlist',
                component: () => import('../views/user/userList/userlist.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '用户列表',
                    parentName:'用户管理',
                    index: '2-1',
                }

            },
            {
                path: '/com',
                name: 'com',
                component: () => import('../views/user/comlist/com.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '公司列表',
                    parentName:'用户管理',
                    index: '2-2',
                }

            },
            {
                path: '/article',
                name: 'article',
                component: () => import('../views/content/article.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '文章列表',
                    parentName:'内容管理',
                    index: '3-1',
                }
            },
            {
                path: '/addarticle',
                name: 'addarticle',
                component: () => import('../views/content/addarticle.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '添加文章',
                    parentName:'内容管理',
                    index: '3-2',
                }
            },
            {
                path: '/updatearticle/:id',
                props: true,
                name: 'updatearticle',
                component: () => import('../views/content/addarticle.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '编辑文章',
                    parentName:'内容管理',
                }
            },
        ]
    },
];


const  route = new VueRouter({
    mode: 'history',   //html5的history  api
    //根路径
    base: process.env.BASE_URL,
    routes,
});

route.beforeEach((to, from, next)=>{
    console.log(to.path);
    document.title = to.meta.title+'- XX';
    //判断当前路由是否需要登录
    if(!to.meta.anonymous){
        //做登录验证
        if(sessionStorage.getItem('name')){
            next();
        }else {
            next('/login')
        }
    }else {
        next();
    }

});

export default route