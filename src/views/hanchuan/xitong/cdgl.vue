<template>
  <div>
  <!-- 卡片视图 -->
  <el-card class="box-card">
    <!-- 搜索与添加区域 -->
    <el-row :gutter="20" style="padding-bottom: 20px">
      <el-col :span="4">
        <el-button type="primary" @click="addparent">新增菜单</el-button>
      </el-col>
    </el-row>
    
    <div>
      <el-table
        @expand-change="change"
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="tableData1"
              style="width: 100%">
              <el-table-column
                width="18">
                <template></template>
              </el-table-column>
              <el-table-column
                width="100"
                label="子菜单ID"
                prop="id">
              </el-table-column>
              <el-table-column
                width="180"
                label="菜单名称"
                prop="name">
              </el-table-column>
              <el-table-column
                width="200"
                label="菜单图标"
                prop="icon">
              </el-table-column>
              <el-table-column
                width="80"
            
                label="排序"
                prop="sort">
              </el-table-column>
              <el-table-column
                label="URL"
                width="344"
                prop="url">
              </el-table-column>
              <el-table-column
                label="备注"
                width="342"
                prop="text">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    icon="el-icon-search"
                    size="mini"
                    type="success"
                    @click="editson(scope.row)">编辑</el-button>
                  <el-button
                    icon="el-icon-delete"
                    size="mini"
                    type="danger"
                    @click="deleteson(scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="菜单ID"
          prop="id">
        </el-table-column>
        <el-table-column
          width="180"
          label="菜单名称"
          prop="name">
        </el-table-column>
        <el-table-column
          width="200"
      
          label="菜单图标"
          prop="icon">
        </el-table-column>
        <el-table-column
          width="80"
      
          label="排序"
          prop="sort">
        </el-table-column>
        <el-table-column
          label="URL"
          prop="url">
        </el-table-column>
        <el-table-column
          label="备注"
      
          prop="text">
        </el-table-column>
        <el-table-column label="操作"  fixed="right" width="300">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-search"
              size="mini"
              type="success"
              @click="edit(scope.row)">编辑</el-button>
            <el-button
              icon="el-icon-edit"
              size="mini"
              type="warning"
              @click="addson(scope.row)">添加子菜单</el-button>
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="deleteparent(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
  
    <!--添加一级菜单-->
    <el-dialog
      :visible.sync="dialogVisible2"
      @close = 'clearUserInfo'
      title="添加菜单"
      width="30%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" @click="dialogVisible = false"><el-button >取 消</el-button>
            <el-button type="primary" @click="editparent">确 定</el-button>
            </span>
    </el-dialog>
    
  <!--修改一级菜单-->
  <el-dialog
    :visible.sync="dialogVisible"
    @close = 'clearUserInfo'
    title="修改菜单"
    width="30%"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.sort"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer" @click="dialogVisible = false"><el-button >取 消</el-button>
            <el-button type="primary" @click="editparent">确 定</el-button>
            </span>
  </el-dialog>
    <!--添加二级菜单-->
    <el-dialog
      :visible.sync="dialogVisible1"
      @close = 'clearUserInfo'
      title="添加子菜单"
      width="30%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" @click="dialogVisible = false"><el-button >取 消</el-button>
            <el-button type="primary" @click="addson2">确 定</el-button>
            </span>
    </el-dialog>
    <!--修改二级菜单-->
    <el-dialog
      :visible.sync="dialogVisible3"
      @close = 'clearUserInfo'
      title="新增菜单"
      width="30%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" @click="dialogVisible = false"><el-button >取 消</el-button>
            <el-button type="primary" @click="addparent2">确 定</el-button>
            </span>
    </el-dialog>
</div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-table__expanded-cell[class*=cell]{
  padding: 0px 30px;
}
</style>

<script>
export default {
  data() {
    return {
      statu:false,
      rowid:"",
      tableData3:[],
      tableData: [],
      tableData1:[],
      dialogVisible:false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      form:{
        parentId: 0,
        name: '',
        icon: '',
        url: '',
        sort: '',
        remark: ''
      }
    }
  },
  methods:{
    clearUserInfo(){
      this.form={
      
      };
    },
    getMenuList() {
      
      this.loading = true;
      this.$http.get("/menu/list", {
        params: {
          access_token: JSON.parse(sessionStorage.getItem("token")),// 当前页
          parentId: -1  ,// 每页大小
          order: "asc",
        }
      }).then(res => {
        this.tableData=res.data;
        this.tableData3=res.data;
        this.tableData = this.tableData.filter(function(item) {
           return item.parentId == 0;
        });
        console.log(this.tableData);
      })
    },
    change(row){
      console.log(row.id);
      this.tableData1=this.tableData3;
      this.tableData1 = this.tableData1.filter(function(item) {
        return item.parentId == row.id;
      });
      console.log(this.tableData1);
    },
    edit(row){
      //console.log(row.id);
      this.rowid = row.id;
      this.dialogVisible = true;
      this.$http.get("/menu/"+row.id,{
        params: {
          access_token: JSON.parse(sessionStorage.getItem("token")),
          id:row.id,
        }
      }).then(res => {
          this.form = res.data.data;
        console.log(this.form);
      })

    },
    editparent(){
      this.dialogVisible=false;
      var id = this.rowid;
      this.$http.put("/menu/"+id + '?access_token=' + JSON.parse(sessionStorage.getItem("token")),{
        parentId: this.form.parentId,
        name: this.form.name,
        icon: this.form.icon,
        url: this.form.url,
        sort: this.form.sort,
        remark: this.form.remark
      }).then(res => {
        if(res.data.code ==0){
          this.$success("修改成功");
          this.getMenuList();
        }else {
          this.$fail("修改失败");
        }
      })
    },
    addparent(){
      this.dialogVisible3 = true;
    },
    addparent2(){
      this.dialogVisible3 = false;
      this.$http.post("/menu?access_token="+ JSON.parse(sessionStorage.getItem("token")),
        {
          parentId: 0,
          name: this.form.name,
          icon: this.form.icon,
          url: this.form.url,
          sort: this.form.sort,
          remark: this.form.remark
        }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$success("添加成功");
          this.getMenuList();
        } else {
          this.$fail("添加失败");
        }
      })
    },
    addson(row){
      console.log(row.id);
      this.rowid = row.id;
      this.dialogVisible1 = true;
    },
    addson2(){
      this.dialogVisible1=false;
      var parentid = this.rowid;
      this.$http.post("/menu?access_token="+ JSON.parse(sessionStorage.getItem("token")),
        {
          parentId: parentid,
          name: this.form.name,
          icon: this.form.icon,
          url: this.form.url,
          sort: this.form.sort,
          remark: this.form.remark
        }).then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.$success("修改成功");
            this.getMenuList();
          } else {
            this.$fail("修改失败");
          }
        })
    },
    editson(row){
      console.log(row.id);
      this.edit(row);
    },
    editson2(){
      this.editparent();
    },
    deleteparent(row){
      console.info(row.id);
      this.open2(row);
    },
    deleteson(row){
      console.info(row.id);
      this.open2(row);
    },
    open2(row) {
      this.$confirm('确定删除此菜单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteinfo(row);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteinfo(row){
      this.$http.delete("/menu/"+row.id,{
        params: {
          access_token: JSON.parse(sessionStorage.getItem("token")),
          id:row.id,
        }
      }).then(res => {
        this.getMenuList();
      })
    }
  },
  created() {
    this.getMenuList();
  }
}
</script>
