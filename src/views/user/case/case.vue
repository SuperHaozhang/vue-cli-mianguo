<template>
    <div >
        <div style="margin: 80px 0;">
            <!--
                        <el-button icon="el-icon-circle-plus-outline"  size="small" type="primary" @click="addUser">添加用户</el-button>
            -->
            <!--            <el-input style="margin-left: 100px;width: 400px"  placeholder="请输入内容" v-model="keywords" class="input-with-select">
                            <el-select v-model="select" slot="prepend" placeholder="请选择">
                                <el-option label="编号" value="1"></el-option>
                                <el-option label="姓名" value="2"></el-option>
                                <el-option label="生日" value="3"></el-option>
                            </el-select>
                            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                        </el-input>-->
        </div>

        <el-table
                v-loading="loading"
                :data="userlist"
                border
                style="width: 100%"
        >
            <el-table-column align="center" prop="id" label="编号" width="80"></el-table-column>
            <!--            <el-table-column align="center" prop="name" label="姓名" width="120">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>姓名: {{ scope.row.name }}</p>
                                    <p>住址: {{ scope.row.address }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>-->
            <el-table-column align="center" prop="title" label="描述" width="180"></el-table-column>
            <!--<el-table-column align="center" prop="sex" :formatter="fmtGender" label="性别" width="50"></el-table-column>-->
            <!--            <el-table-column align="center" prop="hiredate" label="生日" width="100"></el-table-column>
                        <el-table-column align="center" prop="address" label="地址" width="100"></el-table-column>-->
            <el-table-column align="center" prop="img_src" label="图片名称"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                            icon="el-icon-search"
                            size="mini"
                            type="success"
                            @click="detalUserInfo(scope.row)">详情</el-button>
                    <el-button
                            icon="el-icon-edit"
                            size="mini"
                            type="warning"
                            @click="edit(scope.row)">编辑</el-button>
                    <!--                    <el-button
                                                icon="el-icon-delete"
                                                size="mini"
                                                type="danger"
                                                @click="deleteuser(scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>


                    <div style="text-align: center;margin: 10px 0">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="getUserList"
                                :current-page="page"
                                background
                                :page-sizes="[5, 10, 15, 20]"
                                :page-size="pagesize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total"
                        >
                        </el-pagination>
                </div>

        <!--添加用户-->
         <el-dialog
                 @close = 'clearUserInfo'
                 :title="(form.id?`编辑用户`:`添加用户`)"
                 :visible.sync="dialogVisible"
                 width="30%"
                 >
             <el-form ref="form" :model="form"  label-width="80px">
                 <el-form-item label="描述" prop="title">
                     <el-input v-model="form.title"></el-input>
                 </el-form-item>
<!--                 <el-form-item label="密码" prop="password">
                     <el-input v-model="form.password"></el-input>
                 </el-form-item>
                 <el-form-item label="性别" prop="sex">
                     <el-radio-group v-model="form.sex">
                         <el-radio label="1">男</el-radio>
                         <el-radio label="0">女</el-radio>
                     </el-radio-group>
                 </el-form-item>
                 <el-form-item label="生日" prop="hiredate">
                     <el-date-picker type="date" placeholder="选择日期" v-model="form.hiredate" style="width: 100%;"></el-date-picker>
                 </el-form-item>
                 <el-form-item label="地址" prop="address">
                     <el-input type="textarea" v-model="form.address"></el-input>
                 </el-form-item>-->
                 <el-form-item label="头像" prop="img_src">
                     <el-upload
                             name="file"
                             class="avatar-uploader"
                             :action="uploadurl"
                             :show-file-list="false"
                             :on-success="handleAvatarSuccess"
                             :before-upload="beforeAvatarUpload">
                         <img v-if="form.img_src" :src="form.img_src" class="avatar">
                         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                     </el-upload>
                 </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer"><el-button @click="dialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="saveUserInfo">确 定</el-button>
             </span>
         </el-dialog>

        <!--用户详情-->
        <el-dialog
                v-loading="userinfoloading"
                :title="detailUser.name"
                :visible.sync="detailmodalshow"
                width="30%">
            <el-form label-width="80px">
                <el-form-item label="描述">
                    {{detailUser.title}}
                </el-form-item>
                <!--                <el-form-item label="密码">
                                    {{detailUser.password}}
                                </el-form-item>
                                <el-form-item label="性别">
                                    {{detailUser.sex}}
                                </el-form-item>
                                <el-form-item label="生日">
                                    {{detailUser.hiredate}}
                                </el-form-item>
                                <el-form-item label="地址">
                                    {{detailUser.address}}
                                </el-form-item>-->
                <el-form-item label="案例图" prop="avatar">
                    <img v-if="detailUser.img_src" :src="$config.STATIC_URL+detailUser.img_src" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "caselist",
        data(){

            return{
                keywords: '',
                select: '',
                uploadurl:this.$config.BASE_URL + this.$config.api.UPLOAD,
                imageUrl: '',
                pagesize:5,    //    每页的数据
                total : 0,
                userlist: [],
                loading: false,
                userinfoloading:false,
                page: 1,//初始页
                dialogVisible:false,
                detailmodalshow:false,
                detailUser:{},
                form: {
                    id: '',
                    title: '',
                    img_src:'',
                    creat_time:'',
                    active:'',
                },
            }
        },
        methods: {
            clearUserInfo(){
                this.form={
                    id: '',
                    title: '',
                    img_src:'',
                    creat_time:'',
                    active:'',};
            },
            fmtGender(row){
                return ["女","男"][row.sex] || "未知";
            },
            getCount(){
                this.$http.get("http://localhost:8888/casecount",{
                }).then(res=>{
                    this.total = res.data;  //获取总条数
                })
            },
            saveUserInfo(){
                this.dialogVisible=false;
                this.$http({
                    method: 'post',
                    url: '/savecase',
                    data: this.$qs.stringify(this.form)
                }).then(res=>{
                    if(res.data!==0){
                        this.$success("添加成功");
                        console.log("这是第"+this.page);
                        this.getUserList(this.page);
                    }else {
                        this.$fail("添加失败");
                    }
                })
            },
            search(){
                this.page = 1;
                this.getUserList();
            },
            getUserList(pageIndex=1){
                console.log(pageIndex);
                console.log(this.select+":"+this.keywords);
                this.page = pageIndex;
                this.getCount();
                this.loading  = true;
                this.$http.get("/caselist",{
                    params: {
                        pageIndex: pageIndex,// 当前页
                        pageSize: this.pagesize,// 每页大小
                    }
                }).then(res=>{
                    console.log(res.data);
                    this.userlist = res.data.items; //获取封装后的数据
                    this.total = res.data.total;
                    this.loading = false;
                })
            },
            deleteuser(row){
                let data = {
                    'id':row.id
                };
                console.log(this.page);
                this.$confirm('是否删除'+`${row.name}`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: 'post',
                        url: '/delete',
                        data: this.$qs.stringify(data)
                    }).then(res=>{
                        if(res.data===1){
                            this.$success('删除成功!');
                            //判断删除的是否为最后一页的最后一条
                            if((this.total%this.pagesize)===1){
                                this.getUserList(this.page-1);
                            }else {
                                this.getUserList(this.page);
                            }
                        }else {
                            this.$fail('删除失败!');
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            detalUserInfo(user){
                this.detailmodalshow = true;
                this.userinfoloading = true;
                this.$http.get("/caseinfo",{
                    params: {
                        'id': user.id,
                    }
                }).then(res=>{
                    console.log(res.data);
                    this.detailUser = res.data; //获取封装后的数据
                    this.userinfoloading = false;
                });
                console.log(user.id);
            },
            edit(row){
                this.userinfoloading = true;
                this.form.id = row.id;
                this.dialogVisible = true;
                this.$http.get("/caseinfo",{
                    params: {
                        'id': row.id,
                    }
                }).then(res=>{
                    console.log(res.data);
                    this.form = res.data; //获取封装后的数据
                    this.form.img_src =this.$config.STATIC_URL+res.data.img_src;
                    this.userinfoloading = false;
                });
            },
            addUser(){
                this.dialogVisible = true;
            },
            handleSizeChange: function (size) {
                this.pagesize = size;
                this.getUserList();
                console.log(this.pagesize)  //每页下拉显示数据
            },

            handleAvatarSuccess(res, file) {
                //this.imageUrl = URL.createObjectURL(file.raw);
                this.form.img_src =this.$config.STATIC_URL+res.url;
                console.log(this.imageUrl);
            },
            beforeAvatarUpload(file) {
                const isIMG = ["image/jpeg","image/png","image/gif","image/x-icon","image/bmp"].includes(file.type);
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isIMG) {
                    return this.$message.error('图片格式不正确！');
                }
                if (!isLt2M) {
                    return this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return true;
            }
        },
        created() {
            this.getUserList();
        }
    }
    import './case.css'
</script>

<style >

</style>