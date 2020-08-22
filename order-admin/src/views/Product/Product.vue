<template>
  <div>
    <el-row class="source">
      <el-col :span="12">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>产品列表</el-breadcrumb-item>
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
      @selection-change="handleSelectionChange">
      <el-table-column
      type="selection"
      width="55">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
      >
      </el-table-column>
      <el-table-column
        prop="productGroup"
        label="产品系列"
      >
      </el-table-column>
      <el-table-column
        prop="productPrice"
        label="产品单价(元)"
      >
      </el-table-column>
      <el-table-column
        prop="productNum"
        label="产品数量(袋)"
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
            <el-form ref="productForm" :model="productForm" :rules="rules" :label-width="formLabelWidth" slot="content">
                <el-form-item label="产品名称"  prop="productName">
                    <el-input v-model="productForm.productName"></el-input>
                </el-form-item>
                 <el-form-item label="产品系列"  prop="productGroup">
                    <el-input v-model="productForm.productGroup"></el-input>
                </el-form-item>
                 <el-form-item label="产品单价"  prop="productPrice">
                    <el-input v-model="productForm.productPrice">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                 <el-form-item label="产品数量"  prop="productNum">
                    <el-input v-model="productForm.productNum">
                        <template slot="append">袋</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" native-type="reset" @click="resetForm('productForm')">重置</el-button>
                <el-button type="primary" @click="addProduct('productForm')">保存</el-button>
            </div>
        </modal>
        <modal :dialogFormVisible="editModalFlag" @modalToggle="modalChange" :title="'编辑'">
            <el-form ref="ProductEditForm" :model="ProductEditForm" :label-width="formLabelWidth" slot="content">
                <el-form-item label="产品名称"  prop="productName">
                    <el-input v-model="ProductEditForm.productName"></el-input>
                </el-form-item>
                 <el-form-item label="产品系列"  prop="productGroup">
                    <el-input v-model="ProductEditForm.productGroup"></el-input>
                </el-form-item>
                 <el-form-item label="产品单价"  prop="productPrice">
                    <el-input v-model="ProductEditForm.productPrice">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                 <el-form-item label="产品数量"  prop="productNum">
                    <el-input v-model="ProductEditForm.productNum">
                        <template slot="append">袋</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" native-type="reset" @click="resetForm('ProductEditForm')">重置</el-button>
                <el-button type="primary" @click="editProduct('ProductEditForm')">保存</el-button>
            </div>
        </modal>
        <modal :dialogFormVisible="removeModalFlag" @modalToggle="modalChange">
            <p slot="content" style="text-align: center;font-size: 20px;">
                是否删除？
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
          productId:'',
          productForm:{
            productName:'',
            productGroup:'',
            productPrice:"",
            productNum:""
          },
          ProductEditForm:{
            productName:'',
            productGroup:'',
            productPrice:"",
            productNum:""
          },
          ruleForm:{
            productName:'',
            productGroup:'',
            productPrice:"",
            productNum:""
          },
          rules:{
            productName:[
              { required: true, message: '请输入产品名称', trigger: 'blur' }
            ],
            productGroup:[
              { required: true, message: '请输入产品系列名称', trigger: 'blur' }
            ],
            productNum:[
              { required: true, message: '请输入产品数量', trigger: 'blur' }
            ]
          },
          formLabelWidth: '120px',
           
        }
    },
    watch: {
      
    },
    created() {
        this.loadData();
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
          this.ProductEditForm.productName = row.productName;
          this.ProductEditForm.productGroup = row.productGroup;
          this.ProductEditForm.productPrice = row.productPrice;
          this.ProductEditForm.productNum = row.productNum;
          // this.$store.commit('SET_TYPEID', row._id)
          this.productId = row._id;
      },
      showRemoveModal(index,row){
          this.removeModalFlag = true;
          this.productId = row._id;
      },
      loadData(){
        this.loadingFlag = true;
            
        this.$ajax.get('/product/').then(response => {
            this.loadingFlag = false
            let res = response.data.result;
            this.total = response.data.result.length;
            // console.log('clients  ' + res)
            this.tableData = res;
        })
      },
      addProduct(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log('valid   ' + valid)
              if(this.productForm.productName != ''){
                this.$ajax.post('/product/add',this.productForm).then(res => {
                    if (res.data.status === '1') {
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    })
                    this.loadData()
                    this.addModalFlag = false
                    this.resetForm('ProductEditForm')
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
      editProduct(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post(`/product/update/${this.productId}`, this.ProductEditForm).then(res => {
              console.log('product edit   ' + res)
              if (res.status === '200') {
                  this.$message({
                      message: '修改成功',
                      type: 'success'
                  })
                }
                this.loadData()
                this.editModalFlag = false;
                this.resetForm('ProductEditForm')
            })
          }
        })
      },
      handleDelete(){
          this.$ajax.delete(`/product/del/${this.productId}`).then(res => {
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
    
      
      resetForm(formName) {
          this.$nextTick(() => {
            this.$refs[formName].resetFields();
          })
      }
    },

}
</script>