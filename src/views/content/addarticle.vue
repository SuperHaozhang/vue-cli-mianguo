<template>
    <div style="margin: 0 100px">
        <Form :model="formValidate" label-position="left" :label-width="100" ref="formValidate">
            <FormItem label="动态名称" prop="title">
                <Input v-model="formValidate.title" ></Input>
            </FormItem>
            <FormItem label="动态摘要" prop="min_title">
                <Input v-model="formValidate.min_title" ></Input>
            </FormItem>
            <FormItem label="动态缩略图" prop="image">
                <Upload
                        :action="uplodaURL"
                        :format="['jpg','jpeg','png','gif']"
                        :max-size="2048"
                        :on-success="handleSuccess">
                    <Button  ref="upload" icon="ios-cloud-upload-outline">Upload files</Button>
                </Upload>
            </FormItem>
            <FormItem label="文章名称" prop="mesage">
                <editor v-model="formValidate.mesage" @content="getContent" v-bind:contentson="contents"></editor>
            </FormItem>
            <FormItem id="butn">
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
                uplodaURL:this.$config.BASE_URL + this.$config.api.UPLOAD,
                formValidate: {
                    title: '',
                    image:'',
                    min_title:'',
                    mesage: '',
                },
                showaddmodal:false, //添加帖子模态框状态
                contents: '',
            }
        },
        methods:{
            getContent(newval){
                this.formValidate.mesage =  newval;
            },
            addTitle(name){
                this.$refs[name].validate((valid) => {
                    console.log(this.$refs[name].model);
                    this.formValidate.title = this.$refs[name].model.title;
                    this.formValidate.mesage = this.$refs[name].model.mesage;
                    this.formValidate.min_title = this.$refs[name].model.min_title;
                });
                if(this.id === undefined){
                    this.$post('/addNews', this.$qs.stringify(this.formValidate)).then(res=>{
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
                    this.$post(`/updataNews/${this.id}`,this.$qs.stringify(this.formValidate)).then(res=>{
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
/*            dateFormat(date){
                console.log(date);
                this.formValidate.date = date;
            },
            timeFormt(time){
                console.log(time);
                this.formValidate.time = time;
            },*/
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleSuccess (res) {  //富文本框显示上传后的图片
                console.log(res.url);
                this.formValidate.image = res.url;
            },
        },
        created() {
            console.log(this.id);
            if(this.id){
                this.$get("/newsone", {
                    id: this.id
                }).then(res=>{
                    console.log(res.data);
                    this.formValidate.title = res.data.title;
                    this.formValidate.min_title = res.data.min_title;
                    this.contents =  res.data.mesage;
/*                    this.formValidate.date = res.data.date;
                    this.formValidate.time = res.data.time;*/
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
#butn{
    margin: 80px 600px;
}
</style>