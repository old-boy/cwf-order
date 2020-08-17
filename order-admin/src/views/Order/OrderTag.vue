<template>
  <div>
    <el-row class="source">
      <el-col :span="12">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单标签</el-breadcrumb-item>
          </el-breadcrumb>
      </el-col>
      <el-col :span="1" :offset="10">
          <el-button @click="addModalFlag = true" type="success" size="mini">添加</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="loadingFlag"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="tableData"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">>
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
        prop="orderType"
        label="订单类型"
      >
      </el-table-column>
       <el-table-column
        prop="orderTypeDes"
        label="类型描述"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="400"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini"  @click="showEditModal(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="showRemoveModal(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination 
        :total="total"
        :pageCount="pageCount"
        :currentPage="currentPage"
        :pageSize="pageSize"
        @clickpageNum="clickpageNum">
        </pagination>
        <modal :dialogFormVisible="addModalFlag" @modalToggle="modalChange" :title="'新增'">
            <el-form ref="typeForm" :model="typeForm" :rules="rules" :label-width="formLabelWidth" slot="content">
                <el-form-item label="订单类型"  prop="orderType">
                    <el-input v-model="typeForm.orderType"></el-input>
                </el-form-item>
                 <el-form-item label="类型描述"  prop="orderTypeDes">
                    <el-input v-model="typeForm.orderTypeDes"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" native-type="reset" @click="resetForm('typeForm')">重置</el-button>
                <el-button type="primary" @click="addType('typeForm')">保存</el-button>
            </div>
        </modal>
        <modal :dialogFormVisible="editModalFlag" @modalToggle="modalChange" :title="'编辑'">
            <el-form ref="TypeEditForm" :model="TypeEditForm" :label-width="formLabelWidth" slot="content">
                <el-form-item label="订单类型"  prop="orderType">
                    <el-input v-model="TypeEditForm.orderType"></el-input>
                </el-form-item>
                <el-form-item label="类型描述"  prop="orderTypeDes">
                    <el-input v-model="TypeEditForm.orderTypeDes"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" native-type="reset" @click="resetForm('TypeEditForm')">重置</el-button>
                <el-button type="primary" @click="editClientType">保存</el-button>
            </div>
        </modal>
        <modal :dialogFormVisible="removeModalFlag" @modalToggle="modalChange">
            <p slot="content" style="text-align: center;font-size: 20px;">
                是否删除用户？
            </p>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modalChange">取 消</el-button>
                <el-button type="danger" @click="handleDelete">确 定</el-button>
            </div>
        </modal>
    </div>
</template>
<script>
import modal from '@/components/Modal'
import pagination from '@/components/Pagination'

export default {
    components: {
        modal,
        pagination
    },
    data(){
      var validateType = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('类型不能为空'))
          } else {
            callback()
          }
        }
        return {
          total:0,
          pageCount:1,
          currentPage:1,
          pageSize: 10,
          loadingFlag:false,
          addModalFlag: false,
          editModalFlag: false,
          removeModalFlag:false,
          tableData:[],
          typeId:'',
          typeForm:{
            orderType:'',
            orderTypeDes:''
          },
          TypeEditForm:{
            orderType:'',
            orderTypeDes:''
          },
          ruleForm:{
            orderType:'',
            orderTypeDes:''
          },
          rules:{
            orderType:[
              { required: true, message: '请输入类型名称', trigger: 'blur' },
            ]
          },
          formLabelWidth: '120px',
            // 验证密码的规则
            rules: {
                clientType: [
                    { validator: validateType, trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
      
    },
    created() {
        this.loadData();
        // this.totalData();
    },
    methods: {
      clickpageNum(index){
          console.log('pageCount  ' + index)
      },
      handleSelectionChange(){

      },
      modalChange(){
          this.addModalFlag = false;
          this.removeModalFlag = false;
          this.editModalFlag = false;
      },
      showEditModal(index,row){
          this.editModalFlag = true;
          this.TypeEditForm.orderType = row.orderType;
          this.TypeEditForm.orderTypeDes = row.orderTypeDes;
          // this.$store.commit('SET_TYPEID', row._id)
          this.typeId = row._id;
      },
      showRemoveModal(index,row){
          this.removeModalFlag = true;
          this.typeId = row._id;
      },
      loadData(){
        this.loadingFlag = true;
            
        this.$ajax.get('/order/type').then(response => {
            this.loadingFlag = false
            let res = response.data.result;
            // console.log('clients  ' + res)
            this.tableData = res;
        })
      },
      addType(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log('valid   ' + valid)
              if(this.typeForm.orderType != ''){
                this.$ajax.post('/order/type/add',{
                    orderType: this.typeForm.orderType,
                    orderTypeDes: this.typeForm.orderTypeDes
                }).then(res => {
                    if (res.data.status === '1') {
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    })
                    this.loadData()
                    this.addModalFlag = false
                    this.resetForm('typeForm')
                    } else {
                    this.$message.error(res.data.msg)
                    }
                })
            }
          } else {
            return false;
          }
        });
        
      },
      editClientType(){
        this.$ajax.post(`/order/type/update/${this.typeId}`, this.TypeEditForm).then(res => {
              if (res.data.status === '1') {
                  this.$message({
                      message: '修改成功',
                      type: 'success'
                  })
                  this.loadData()
                  this.editModalFlag = false;
                  this.resetForm('TypeEditForm')
              }else{
                  this.$message.error(res.data.msg)
              }
          })
      },
      handleDelete(){
          this.$ajax.delete(`/order/type/del/${this.typeId}`).then(res => {
                if (res.data.status === '1') {
                this.$message({
                    message: res.data.msg,
                    type: 'success'
                })
              // 重新获取新数据
              this.loadData()
              this.removeModalFlag = false
            } else {
              this.$message.error(res.data.msg)
              this.removeModalFlag = false
            }
         })
      },
      totalData(){
          this.$ajax.get('/order/type/total').then(response => {
            this.total = response.data.total;
          })
      },
      
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },

}
</script>