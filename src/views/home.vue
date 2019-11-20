<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8" style="height: 250px">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>快速入口</span>
                        <el-button style="float: right;padding: 3px 0" type="text">管理</el-button>
                    </div>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-card shadow="hover" style="background: #B3D8FF">
                                <a href="" class="el-icon-s-custom" style="color: #2c3e50">添加用户</a>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card shadow="hover" style="background: #E1F3D8">
                                <a href="" class="el-icon-s-custom">用户管理</a>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card shadow="hover" STYLE="background: rgb(253, 246, 236)">
                                <a href="" class="el-icon-s-custom">帖子管理</a>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-card shadow="hover" STYLE="background: rgb(233, 233, 235)">
                                <a href="" class="el-icon-edit">投诉管理</a>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>

            <el-col :span="8" style="height: 250px">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>快速入口</span>
                        <el-button style="float: right;padding: 3px 0" type="text">管理</el-button>
                    </div>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-card shadow="hover" style="background: #B3D8FF">
                                <a href="" class="el-icon-s-custom" style="color: #2c3e50">添加用户</a>
                            </el-card>
                        </el-col>
                        <el-col :span="12">
                            <el-card shadow="hover" style="background: #E1F3D8">
                                <a href="" class="el-icon-s-custom">用户管理</a>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-card shadow="hover" STYLE="background: rgb(233, 233, 235)">
                                <a href="" class="el-icon-edit">投诉管理</a>
                            </el-card>
                        </el-col>
                        <el-col :span="12">
                            <el-card shadow="hover" STYLE="background: rgb(233, 233, 235)">
                                <a href="" class="el-icon-edit">投诉管理</a>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>

            <el-col :span="8" style="height: 250px">
                <el-card class="box-card" id="card2">
<!--                    <el-calendar v-model="value">
                    </el-calendar>-->
                    <iframe allowtransparency="true" frameborder="0" width="410" height="98" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=1&z=1&t=1&v=0&d=2&bd=0&k=&f=&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=54511&w=410&h=98&align=center"></iframe>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{nickname}}</span>
                    </div>
                    <chartscolumn id="cloumn"width="444px" height="300px"></chartscolumn>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                    </div>
                    <chartsline id="line" width="444px" height="300px"></chartsline>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                    </div>
                    <chartspie id="pie" width="444px" height="300px"></chartspie>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    //import G2 from '@antv/g2';
    import {chartscolumn,chartsline,chartspie} from '../components/index'
    import {mapState,mapMutations} from 'vuex'
    export default {
        name: "home",
        components:{
            chartscolumn,
            chartsline,
            chartspie,
        },
        methods:{
            setName(){
               this.setnickName("666")
            },
            ...mapMutations(["setnickName"])
        },
        data(){
            return{
                value: new Date()
            }
        },
        computed:{
            ...mapState(["nickname"])
        },
        created() {
            this.setName()
        }

    }
</script>

<style >
.el-card__body{
    padding: 10px 10px;
}
.el-row{
    margin: 5px 0;
}
    a{
        text-decoration: none;
    }
.el-calendar__header{
    padding: 0 0;
}
.el-calendar__body{
    padding: 0 0;
}

.el-calendar-day{
    width: 30px !important;
    height: 28px !important;
}
#card2 >.el-card__body{
    padding: 0 0;
}
</style>