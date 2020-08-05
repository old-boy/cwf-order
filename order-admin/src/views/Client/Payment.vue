<template>
    <div>
        <el-row class="source">
            <el-col :span="12">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>付款方式</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="1" :offset="10">
                <el-button @click="addModal" type="success" size="mini">添加</el-button>
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
                prop="paymentAccount"
                label="付款帐号"
            >
            </el-table-column>
            <el-table-column
                prop="paymentName"
                label="帐号名称"
            ></el-table-column>
            <el-table-column
                prop="createdAt"
                label="创建日期"
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
            <el-form ref="addPayForm" :model="addPayForm" :label-width="formLabelWidth" slot="content">
                <el-form-item label="付款帐号"  prop="paymentAccount">
                    <el-input v-model="addPayForm.paymentAccount"></el-input>
                </el-form-item>
                <el-form-item label="帐户名称"  prop="paymentName">
                    <el-input v-model="addPayForm.paymentName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" native-type="reset">重置</el-button>
                <el-button type="primary" @click="addPay">保存</el-button>
            </div>
        </modal>
        <modal :dialogFormVisible="mofiyModalFlag" @modalToggle="modalChange" :title="'修改'">
            <el-form ref="mofiyPayForm" :model="mofiyPayForm" :label-width="formLabelWidth" slot="content">
                <el-form-item label="付款帐号"  prop="paymentAccount">
                    <el-input v-model="mofiyPayForm.paymentAccount"></el-input>
                </el-form-item>
                <el-form-item label="帐户名称"  prop="paymentName">
                    <el-input v-model="mofiyPayForm.paymentName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" native-type="reset">重置</el-button>
                <el-button type="primary" @click="mofiyPay">保存</el-button>
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
        var validateAccount = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('帐号不能为空'))
          } else {
            callback()
          }
        }
        var validateAccountName = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('帐号名称不能为空'))
          } else {
            callback()
          }
        }
        return {
            loadingFlag: false,
            addModalFlag:false,
            mofiyModalFlag:false,
            removeModalFlag:false,
            total:0,
            pageCount:1,
            currentPage:1,
            pageSize: 10,
            tableData:[],
            addPayForm:{
                paymentAccount:'',
                paymentName:''
            },
            mofiyPayForm:{
                paymentAccount:'',
                paymentName:''
            },
            rules:{
                paymentAccount: [
                    { validator: validateAccount, trigger: 'blur' }
                ],
                paymentName: [
                    { validator: validateAccountName, trigger: 'blur' }
                ]
            },
            payId:'',
            formLabelWidth: '120px'
        }
    },
    created() {
        this.loadingData();
        
    },
    methods: {
        clickpageNum(){

        },
        addModal(){
            this.addModalFlag = true
        },
        addPay(){
            this.$ajax.post('/pay/add', {
                paymentAccount: this.addPayForm.paymentAccount,
                paymentName: this.addPayForm.paymentName
            }).then(res => {
                if (res.data.status === '1') {
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    })
                    this.loadingData()
                    this.addModalFlag = false;
                    this.resetForm('addPayForm')
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        mofiyPay(){
            this.$ajax.post(`/pay/modify/${this.payId}`,this.mofiyPayForm).then(res => {
                if (res.data.status === '1') {
                    this.$message({
                    message: res.data.msg,
                    type: 'success'
                    })
                    // 重新获取新数据
                    this.loadingData();
                    this.mofiyModalFlag = false
                }
                
                this.mofiyModalFlag = false;
                this.loadingData();
                this.mofiyPayForm.paymentAccount = '';
                this.mofiyPayForm.paymentName = '';
            })
        },
        loadingData(){
            this.loadingFlag = true;
            this.$ajax.get('/pay/').then(res => {
                this.loadingFlag = false;
                let data = res.data.result;
                this.tableData = data;
            })
            this.totalData();
        },
        totalData(){
            this.$ajax.get('/pay/total').then(response => {
            this.total = response.data.total;

            console.log('payTotal   ' + this.total)
            })
        },
        
        showEditModal(index,row){
            this.mofiyModalFlag = true;
            this.payId = row._id;
            this.showPay(row)
        },
        showPay(row){
            console.log('payRow  ' + row)
            this.mofiyPayForm.paymentAccount = row.paymentAccount
            this.mofiyPayForm.paymentName = row.paymentName
        },
        showRemoveModal(index,row){
            this.removeModalFlag = true;
            this.payId = row._id;
        },
        handleDelete(){
            this.$ajax.delete(`/pay/del/${this.payId}`,{
                params: {
                    id: this.tempId
                }
            }).then(res => {
                if (res.data.status === '1') {
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    })
                    // 重新获取新数据
                    this.loadingData()
                    this.removeModalFlag = false
                    } else {
                    this.$message.error(res.data.msg)
                    this.removeModalFlag = false
                }
            })
        },
        modalChange(){
            this.addModalFlag = false;
            this.mofiyModalFlag = false;
            this.removeModalFlag = false;
        },
        handleSelectionChange(){

        },
        resetForm (formName) {
            this.$refs[formName].resetFields()
        }
    },
}
</script>