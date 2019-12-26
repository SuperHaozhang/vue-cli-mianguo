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
                path: '/about',
                name: 'about',
                component: () => import('../views/home1.vue'), //异步加载组件，需要时点开再加载该组件
                meta:{
                    title: '主页',
                    index : '1',

                }
            },
            {
                path: '/mulu',
                name: 'mulu',
                component: () => import('../views/hanchuan/mulu/mulu.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '农产品目录',
                    parentName:'',
                    index: '2',
                }

            },
            {
                path: '/nongyao',
                name: 'nongyao',
                component: () => import('../views/hanchuan/guanli/nongyao.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '农药管理',
                    parentName:'农产品投入管理',
                    index: '3-1',
                }
            },
            {
                path: '/huafei',
                name: 'huafei',
                component: () => import('../views/hanchuan/guanli/huafei.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '化肥管理',
                    parentName:'农产品投入管理',
                    index: '3-2',
                }
            },
            {
                path: '/zhongzi',
                name: 'zhongzi',
                component: () => import('../views/hanchuan/guanli/zhongzi.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '种子管理',
                    parentName:'农产品投入管理',
                    index: '3-3',
                }
            },
            {
                path: '/goods/add',
                name: 'add',
                component: () => import('../components/add/Add.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '农药添加',
                    parentName:'农产品投入管理',
                    index: '3-4',
                }
            },
            {
                path: '/dangan',
                name: 'dangan',
                component: () => import('../views/hanchuan/dangan/dangan.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '田间档案',
                    parentName:'',
                    index: '4',
                }
            },
            {
                path: '/baogao',
                name: 'baogao',
                component: () => import('../views/hanchuan/baogao/baogao.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '农产品检测报告',
                    parentName:'',
                    index: '5',
                }
            },
            {
                path: '/xiaoshou',
                name: 'xiaoshou',
                component: () => import('../views/hanchuan/xiaoshou/xiaoshou.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '农产品销售',
                    parentName:'',
                    index: '6',
                }
            },
            {
                path: '/jbxx',
                name: 'jbxx',
                component: () => import('../views/hanchuan/xinxi/ztxx.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '基本信息',
                    parentName:'主体信息',
                    index: '7-1',
                }
            },
            {
                path: '/ztjj',
                name: 'ztjj',
                component: () => import('../views/hanchuan/xinxi/ztjj.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '主体简介',
                    parentName:'主体信息',
                    index: '7-2',
                }
            },
            {
                path: '/qyry',
                name: 'qyry',
                component: () => import('../views/hanchuan/xinxi/qyry.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '企业人员',
                    parentName:'主体信息',
                    index: '7-3',
                }
            },
            {
                path: '/zhuisuma',
                props: true,
                name: 'zhuisuma',
                component: () => import('../views/hanchuan/zhuisuma/zhuisuma.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '追溯码生成',
                    parentName:'',
                    index: '8',
                }
            },
            {
                path: '/xgmm',
                props: true,
                name: 'xgmm',
                component: () => import('../views/hanchuan/xitong/xgmm.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '修改密码',
                    parentName:'系统管理',
                    index: '9-1',
                }
            },
            {
                path: '/czrz',
                props: true,
                name: 'czrz',
                component: () => import('../views/hanchuan/xitong/czrz.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '修改密码',
                    parentName:'系统管理',
                    index: '9-2',
                }
            },
            {
                path: '/cdgl',
                props: true,
                name: 'cdgl',
                component: () => import('../views/hanchuan/xitong/cdgl.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '菜单管理',
                    parentName:'系统管理',
                    index: '9-3',
                }
            },
            {
                path: '/jsgl',
                props: true,
                name: 'jsgl',
                component: () => import('../views/hanchuan/xitong/jsgl.vue'), //异步加载组件，需要时点开再加载该组件
                meta: {
                    title: '角色管理',
                    parentName:'系统管理',
                    index: '9-4',
                }
            },
        ]
    },
    {
        path: '*',
        name: '404',
        component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
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
    document.title = to.meta.title+'- 汉川农产品';
    //判断当前路由是否需要登录
    if(!to.meta.anonymous){
        //做登录验证
        // 获取token
        //使用login1组件就使用下列注释代码(token验证)
        const tokenStr = window.sessionStorage.getItem('token')
        if (!tokenStr) return next('/login')
        //使用login组件就是用下列代码(登录名验证)
/*        if(sessionStorage.getItem('name')){
            next();
        }else {
            next('/login')
        }*/
        else {
            next()
        }
    }else {
        next();
    }

});

export default route
