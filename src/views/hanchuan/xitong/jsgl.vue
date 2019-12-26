<template>
    <div >
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20" style="padding-bottom: 20px">
        <el-col :span="4">
          <el-button type="primary" @click="addUser">添加角色</el-button>
        </el-col>
      </el-row>
        <el-table
                v-loading="loading"
                :data="userlist"
                border
                style="width: 100%"
                >
            <el-table-column align="center" prop="name" label="角色名称" width="280"></el-table-column>
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
            <el-table-column align="center" prop="role" label="角色编号" width="380"></el-table-column>

            <el-table-column align="center" prop="description" label="描述" width="400"></el-table-column>
 
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                            icon="el-icon-search"
                            size="mini"
                            type="success"
                            @click="info(scope.row)">修改</el-button>
                    <el-button
                            icon="el-icon-edit"
                            size="mini"
                            type="warning"
                           @click="deleteuser(scope.row)">删除</el-button>
                    <el-button
                            icon="el-icon-delete"
                            size="mini"
                            type="danger"
                            @click="menuList(scope.row)">关联菜单</el-button>
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
                        layout="prev, pager, next, jumper"
                        :total="total"
                >
                </el-pagination>
        </div>
      

        <!--修改-->
      <el-dialog
        :visible.sync="dialogVisible"
        @close = 'clearUserInfo'
        :title="(sysRoleData.id?`编辑用户`:`添加用户`)"
        width="30%"
      >
        <el-form ref="form" :model="sysRoleData" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="sysRoleData.name"></el-input>
          </el-form-item>
          <el-form-item label="角色编号">
            <el-input v-model="sysRoleData.role"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="sysRoleData.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" @click="dialogVisible = false"><el-button >取 消</el-button>
            <el-button type="primary" @click="saveUserInfo">确 定</el-button>
            </span>
      </el-dialog>
    <!--树形菜单-->
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <el-tree
          :data="data2"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps">
        </el-tree>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "userlist",
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
                centerDialogVisible:false,
                detailUser:{},
                form:{id:""},
                sysRoleData: {
                  createTime: "",
                  description: "",
                  id: 0,
                  modifyTime: "",
                  modules: "",
                  name: "",
                  role: "",
                  status: "",
                },
              data1:[],
              data2: [{
                id: 1,
                label: '一级 1',
                children: [{
                  id: 4,
                  label: '二级 1-1',
                }]
              }, {
                id: 2,
                label: '一级 2',
                children: [{
                  id: 5,
                  label: '二级 2-1'
                }, {
                  id: 6,
                  label: '二级 2-2'
                }]
              }, {
                id: 3,
                label: '一级 3',
                children: [{
                  id: 7,
                  label: '二级 3-1'
                }, {
                  id: 8,
                  label: '二级 3-2'
                }]
              }],
              defaultProps: {
                children: 'children',
                label: 'label'
              }
            }
        },
        methods: {
            clearUserInfo(){
                this.sysRoleData={
                   name: '',
                    role: '',
                  description: ''
              }
            },
            fmtGender(row){
                return ["女","男"][row.sex] || "未知";
            },
/*            getCount(){
                this.$http.get("http://localhost:8888/usercount",{
                }).then(res=>{
                    this.total = res.data;  //获取总条数
                })
            },*/
            saveUserInfo(){
                this.dialogVisible=false;
                var id = this.form.id;
                if(id ==""||id==undefined){
                  this.addUser2();
                }
                console.log(id);
                this.$http.put("/role/"+id + '?access_token=' + JSON.parse(sessionStorage.getItem("token")),{
                description: this.sysRoleData.description,
                name: this.sysRoleData.name,
                role: this.sysRoleData.role,
              }).then(res => {
                if(res.data.code ==0){
                  this.$success("修改成功");
                  this.getUserList();
                }else {
                  this.$fail("修改失败");
                }
              })
            },
            search(){
                this.page = 1;
                this.getUserList();
            },
            getUserList(pageIndex=1){
                console.log(pageIndex);
                
                this.page = pageIndex;
                this.loading  = true;
                this.$http.get("/roles",{
                    params: {
                      access_token: JSON.parse(sessionStorage.getItem("token")),
                      name: '',
                      pn: pageIndex,
                      ps: 10
                    }
                }).then(res=>{
                    console.log(res.data);
                    this.userlist = res.data.data.pageList; //获取封装后的数据
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
                  this.$http.delete("/role/"+row.id,{
                    params: {
                      access_token: JSON.parse(sessionStorage.getItem("token")),
                      id:row.id,
                    }
                  }).then(res=>{
                    console.log(res.data.code)
                        if(res.data.code==0){
                            this.$success('删除成功!');
                            this.getUserList();
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
                this.$http.get("/indexinfo",{
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
          info(row){
                //this.userinfoloading = true;
                this.form.id = row.id;
                this.dialogVisible = true;
                this.$http.get("/role/"+row.id,{
                params: {
                  access_token: JSON.parse(sessionStorage.getItem("token")),
                  id:row.id,
                }
              }).then(res=>{
                console.log(res.data);
                this.sysRoleData = res.data.data;
              });
            },
            addUser(){
                this.dialogVisible = true;
            },
            addUser2(){
              this.$http.post("/role?access_token="+ JSON.parse(sessionStorage.getItem("token")),
                {
                  description: this.sysRoleData.description,
                  name: this.sysRoleData.name,
                  role: this.sysRoleData.role,
                }).then(res => {
                console.log(res);
                if (res.data.code == 0) {
                  this.dialogVisible = false;
                  this.$success("添加成功");
                  this.getUserList();
                } else {
                  this.$fail("添加失败");
                }
              })
            },
            handleSizeChange: function (size) {
                this.pagesize = size;
                this.getUserList();
                console.log(this.pagesize)  //每页下拉显示数据
            },
          menuList(row){
              let num1 = 0;
              let num2 = 0;
            this.centerDialogVisible=true;
            this.$http.get("/menus/role/"+row.id,{
              params: {
                access_token: JSON.parse(sessionStorage.getItem("token")),
              }
            }).then(res=>{
              console.log(res.data.data);
              this.data1 = res.data.data.slice(0);;
              res.data.data.forEach((item,index)=>{
                if(item.pId==0){
                  this.data1[num1].id=item.id;
                  this.data1[num1].label=item.name;
                  num1++;
                }
              });
              //this.data2 = res.data.data;
              //console.log(this.data2);
              this.data1 = res.data.data.slice(0);
              res.data.data.forEach((item,index)=>{
                  if(item.pId==0){
                    this.data1[num1].id=item.id;
                    this.data1[num1].label=item.name;
                    num1++;
                  }
              });
              //console.log(num1);
              this.data1.splice(num1-1,this.data1.length-num1+1)
              this.data1.forEach((item1,index)=>{
                    console.log(item1.name)
              });
              console.log(res.data.data);
              this.data2 = this.data1.slice(0);
              num1=0;
            });
          }
          
        },
        created() {
            this.getUserList();
        }
    }
</script>

<style >

</style>
