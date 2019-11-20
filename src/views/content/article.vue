<template>
    <div>
        <div style="margin: 10px 0px">
            <Button type="primary" size="large" to="/addarticle">添加文章</Button>
        </div>
        <Table border :columns="columns1" :data="data1">
            <template slot-scope="{ row }" slot="id"  >
                <strong>{{ row.id }}</strong>
            </template>
            <template slot-scope="{ row }" slot="title">
                <p v-html="row.title"></p>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
                <Button type="warning" size="small" style="margin-right: 5px"@click="edit(index)">编辑</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
        </Table>
        <!-- 分页组件-->
        <Col span="8" offset="8" style="margin-top: 5px"><Page :total="total" show-sizer
                                       @on-change="getTitleList"
                                       :page-size-opts="[5, 10, 15, 20]"
                                       @on-page-size-change="pagesizeNum"
                                       :page-size="pagesize"/></Col>

        <!-- 查看详情模态框-->
        <Modal
                :scrollable="true"
                v-model="showModal"
                :title="data2.cname"
                footer-hide
                width="600px">
            <p v-html="data2.title" style="height: 150px;overflow-y: scroll"></p>
            <p>发帖时间:--{{data2.date}}</p>
            <p>浏览总数:--{{data2.click}}</p>
            <p>回复总数:--{{data2.mesnum}}</p>
        </Modal>
    </div>
</template>

<script>
    import {editor} from '../../components/index.js'
    export default {
        components:{
          editor
        },
        name: "article",
        data(){
            return{
                columns1: [
                    {
                        title: 'id',
                        width:"80",
                        slot: 'id'
                    },
                    {
                        title: '发帖人',
                        width:"80",
                        key: 'cname'
                    },
                    {
                        title: '帖子名称',
                        width: 400,
                        slot: 'title'
                    },
                    {
                        title: '发帖时间',
                        width: 300,
                        key: 'date'
                    },
                    {
                        title: '点击数',
                        width: 100,
                        key: 'click'
                    },
                    {
                        title: '回复数',
                        width: 100,
                        key: 'mesnum'
                    } ,
                    {
                        title: 'Action',
                        slot: 'action',
                        align: 'center'
                    }
                ],
                //value1: ,
                data1: [],
                data2: [],
                total:100,
                current:1,
                pagesize:5,
                showModal: false, //查看详情模态框状态
                formValidate: {
                    name: '',
                    title: '',
                    date: '',
                    time:'',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'text', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                }
            }
        },
        methods:{
            pagesizeNum(pagesizenum){
                this.pagesize=pagesizenum;
                this.getTitleList();
            },
            getTitleList(current=1){
                console.log(current)
                this.$http.get("/titlelist",{
                    params: {
                        pageIndex: current,// 当前页
                        pageSize: this.pagesize,// 每页大小
                    }
                }).then(res=>{
                    console.log(res.data);
                    this.data1 = res.data.items;
                    this.total = res.data.total;
                })
            },
            show(index) {
                this.showModal = true;
                console.log(this.data1[index].id);
                this.$get("/titleOne", {
                    id: this.data1[index].id
                }).then(res=>{
                    console.log(res.data);
                    this.data2 = res.data;
                })
                //this.data2 = this.data1[index].cname
            },
            remove (index) {
                console.log(this.data1[index].id);
                this.data1.splice(index, 1);
            },
            edit (index) {
                console.log(this.data1[index].id);
                //this.$go('/updatearticle?id='+this.data1[index].id);
                this.$go(`/updatearticle/${this.data1[index].id}`);
            },


        },
        created() {
            this.getTitleList();
        }
    }
</script>

<style scoped>

</style>