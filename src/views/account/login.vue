<template xmlns="">
    <div class="container" >
        <div class="content">
            <el-card class="box-card" shadow="hover" v-loading="loginLoding">
                <el-form ref="form" :model="form" style="margin-top: 5px" :rules="rules">
                    <el-form-item style="text-align: center">
                        <div style="font-size: 22px;">后台管理系统</div>
                        <el-alert
                                :style="styleobj"
                                :title="title"
                                :type="mess"
                                @close="rest"
                                show-icon>
                        </el-alert>
                    </el-form-item>
                    <el-form-item prop="name">
                        <el-input prefix-icon="el-icon-s-custom" v-model.trim="form.loginName" placeholder="账户"></el-input>
                    </el-form-item>
                    <el-form-item prop="pwd">
                        <el-input prefix-icon="el-icon-unlock" type="password" v-model.trim="form.password"  placeholder="密码" @keyup.enter.native="onSubmit"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button style="width: 100%"
                                   type="primary"
                                   @click="onSubmit"
                                   id="TencentCaptcha">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>
<script>
    export default {
        name: "login",
            data() {
                return {
                    loginLoding: false,
                    form: {
                        loginName: '',
                        password: '',
                    },
                    styleobj:{
                        'display':'none',
                    },
                    title:'',
                    mess:'',
                    rules:{
                        loginName:[
                            {required:true,message:'请输入账号',trigger:'blur'},
                        ],
                        password:[
                            {required:true,message:'请输入密码',trigger:'blur'},
                        ]
                    }
                };
            },
        methods:{
            onSubmit(){
                this.loginLoding = true;
                if(!this.form.loginName || !this.form.password){
                    this.loginLoding = false;
                    return this.$warn('用户名和密码不能为空');
                }
/*                var _this = this;
                var captcha1 = new TencentCaptcha('2005857848', function(res) {
                    if(res.ret == 0){
                        _this.login()
                    }else {
                        return;
                    }
                });
                captcha1.show();*/
                this.login();
            },
            rest() {
                this.styleobj={
                    'display': 'none',
                }
            },
            login(){
                this.$http.post('/sysuser/token', {
                    loginName: this.form.loginName,
                    password: this.form.password
                }).then(res=>{
                    console.log(res);
                    if(res.data.code === 0){
                        this.mess = 'success';
                        this.title = "登录成功";
                        this.loginLoding = false;
                        this.styleobj={
                            'height': '30px',
                            'width': '165px',
                            'margin-left': '150px',
                        };
                        sessionStorage.setItem('token',JSON.stringify(res.data.data.token.access_token));
                        sessionStorage.setItem('loginName',res.data.data.user.loginName);
                        sessionStorage.setItem('password',res.data.data.user.password);
                        sessionStorage.setItem('name',res.data.data.user.name);
                        sessionStorage.setItem('id',res.data.data.user.id);
                        sessionStorage.setItem('avatar',res.data.data.user.avatar);
                        sessionStorage.setItem('menuIds',res.data.data.param);
                        this.$store.commit("settoken", JSON.stringify(res.data.data.token.access_token));
                        setTimeout(()=>{
                            this.$go('/');
                        },1000);
                    }
                    if(res.data.code!==0){
                        this.loginLoding = false;
                        this.mess = 'error';
                        this.title = res.data.message;
                        this.styleobj={
                            'height': '30px',
                            'width': '165px',
                            'margin-left': '150px',
                        };
                        this.form.pwd = '';
                    }
                }).catch(reason => {
                    this.loginLoding = true;
                    if(reason.message==='Network Error'){
                        this.$fail('网络开小差，请稍后重试！！！')
                    }
                    this.loginLoding = false;
                    console.log(reason)
                })
            }
        }
    }
</script>
<style lang="scss">
    $w:100vw;
    $h:100vh;

    .container{
        width: $w;
        height: $h;
        background: linear-gradient(to bottom,#409EFF,#ffffff);
        //background: url("../../../static/timg.jpg");
        opacity: 0;
        animation: change 0.5s 0.2s forwards;
        display: flex;
        justify-content: center;
        align-items: center;

        font:{
            size: 30px;
            family:'宋体';
            weight: bold;
        }

        .content .box-card{
            width: 500px;
            height: 300px;
            background: #ffffff;
        }
    }

    @keyframes change {
        from{
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
</style>
