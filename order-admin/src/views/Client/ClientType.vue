<template>
    <div>
        <el-row class="source">
            <el-col :span="12">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>客户类型</el-breadcrumb-item>
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
                prop="clientType"
                label="客户类型"
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
            <modal :dialogFormVisible="addModalFlag" @modalToggle="modalChange" :title="'编辑'">
                <el-form ref="clientTypeForm" :model="clientTypeForm" :label-width="formLabelWidth" slot="content">
                    <el-form-item label="客户类型"  prop="clientType">
                        <el-input v-model="clientTypeForm.clientType"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="danger" native-type="reset">重置</el-button>
                    <el-button type="primary" @click="addClientType">保存</el-button>
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
        var validateClientType = (rule, value, callback) => {
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
            loadingFlag: false,
            tableData: [],
            temId:'',
            clients:[],
            addModalFlag: false,
            removeModalFlag:false,
            clientTypeForm:{
                clientType:""
            },
            formLabelWidth: '120px',
            // 验证密码的规则
            rules: {
                clientType: [
                    { validator: validateClientType, trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.loadData()
    },
    methods: {
        //分页点击下一页
        clickpageNum(index){
            console.log('pageCount  ' + index)
            // this.loadingFlag = true
            // this.currentPage = index;
            // this.$ajax.get(`/users/page/${this.currentPage}/size/${this.pageSize}`,{
            //     params: {
            //         page: this.currentPage,
            //         size: this.pageSize
            //     }
            // }).then(response => {
            //     this.loadingFlag = false
            //     let res = response.data.result
            //     this.tableData = res
            // })
        },
        handleSelectionChange(){

        },
        showEditModal(){

        },
        showRemoveModal(){

        },
        modalChange(){
            this.addModalFlag = false;
            this.removeModalFlag = false;
        },
        saveInfo(){

        },
        addModalType(){
            this.addModalFlag = true;
        },
        addClientType(){
            if(this.clientTypeForm.clientType != ''){
                this.$ajax.post('/clients/type/add',{
                    clientType: this.clientTypeForm.clientType
                }).then(res => {
                    if (res.data.status === '1') {
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    })
                    this.loadData()
                    this.addModalFlag = false
                    this.resetForm('clientTypeForm')
                    } else {
                    this.$message.error(res.data.msg)
                    }
                })
            }
        },
        loadData(){
            this.loadingFlag = true;
            
            this.$ajax.get('/clients/type').then(response => {
                this.loadingFlag = false
                let res = response.data.result;
                console.log('clients  ' + res)
                this.tableData = res;
            })

            this.totalData();
        },
        totalData(){
            this.$ajax.get('/clients/total').then(response => {
            this.total = response.data.total;
            })
        },
        showRemoveModal(index,row){
            this.removeModalFlag = true;
            this.temId = row.id;
        },
        resetForm (formName) {
            this.$refs[formName].resetFields()
        }
    },
}
</script>