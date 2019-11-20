<template>
    <div style="margin: 0 100px">
        <Form :model="formValidate" label-position="left" :label-width="100" ref="formValidate">
            <FormItem label="发帖人" prop="name">
                <Input v-model="formValidate.name" ></Input>
            </FormItem>
            <FormItem label="文章名称" prop="title">
                <editor v-model="formValidate.title" @content="getContent" v-bind:contentson="contents"></editor>
            </FormItem>
            <FormItem label="时间" prop="Date" style="margin-top: 100px;margin-right: 650px">
                <Row>
                    <Col span="11">
                        <FormItem prop="date">
                            <DatePicker
                                    type="date"
                                    placeholder="Select date"
                                    v-model="formValidate.date"
                                    :value="formValidate.date"
                                    format="yyyy年MM月dd日"
                                    @on-change="dateFormat"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <FormItem prop="time">
                            <TimePicker
                                    type="time"
                                    placeholder="Select time"
                                    v-model="formValidate.time"
                                    :value="formValidate.time"
                                    format="HH时mm分ss秒"
                                    @on-change="timeFormt"></TimePicker>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="addTitle('formValidate')">确定</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import {editor} from '../../components/index.js'


    export default {
        props:[`id`],
        components:{
            editor
        },
        name: "addarticle",
        data(){
            return{
                formValidate: {
                    name: '',
                    //name: this.$route.query.id,
                    title: '',
                    date: '',
                    time:'',
                },
                showaddmodal:false, //添加帖子模态框状态
                contents: '',

            }
        },
        methods:{
            getContent(newval){
                console.log(newval);
                this.formValidate.title = newval;
            },
            addTitle(name){
                this.$refs[name].validate((valid) => {
                    console.log(this.formValidate);
                    this.formValidate.name = this.$refs[name].model.name;
                    this.formValidate.title = this.$refs[name].model.title;
                    this.formValidate.date = this.$refs[name].model.date;
                    this.formValidate.time = this.$refs[name].model.time;
                });
                if(this.id === undefined){
                    this.$post('/addtitle', this.$qs.stringify(this.formValidate)).then(res=>{
                        if(res.data!==0){
                            this.$success("添加成功");
                            //刷新一次
                            this.$go('/article');
                            this.$refs[name].resetFields();
                        }else {
                            this.$fail("添加失败");
                        }
                    })
                }else {
                    this.$post(`/updatetitle/${this.id}`,this.$qs.stringify(this.formValidate)).then(res=>{
                        if(res.data!==0){
                            this.$success("修改成功");
                            //刷新一次
                            this.$go('/article');
                            this.$refs[name].resetFields();
                        }else {
                            this.$fail("修改失败");
                        }
                    })
                }
            },
            dateFormat(date){
                console.log(date);
                this.formValidate.date = date;
            },
            timeFormt(time){
                console.log(time);
                this.formValidate.time = time;
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
        },
        created() {
            console.log(this.id);
            if(this.id){
                this.$get("/titleOne", {
                    id: this.id
                }).then(res=>{
                    console.log(res.data);
                    this.formValidate.name = res.data.cname;
                    //this.formValidate.title = res.data.title;
                    this.contents =  res.data.title;
                    console.log(this.contents+"11111");
                    this.formValidate.date = res.data.date;
                    this.formValidate.time = res.data.time;
                })
            }
        },
        watch:{
            contents(newVal,oldVal){
                if(newVal!==oldVal){
                    this.contents = newVal
                }else {
                    this.contents = oldVal
                }
            }
        }
    }
</script>

<style scoped>

</style>