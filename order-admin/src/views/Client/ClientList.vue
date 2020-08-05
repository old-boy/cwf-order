<template>
    <div>
        <el-row class="source">
            <el-col :span="12">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>客户列表</el-breadcrumb-item>
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
                prop="clientName"
                label="客户名称"
            >
            </el-table-column>
            <el-table-column
                prop="type"
                label="客户类型"
            ></el-table-column>
            <el-table-column
                prop="address"
                label="客户地址"
            >
            </el-table-column>
            <el-table-column
                prop="tel"
                label="客户电话"
            >
            </el-table-column>
            <el-table-column
                prop="fax"
                label="客户传真"
            >
            </el-table-column>
            <el-table-column
                prop="contactPerson"
                label="订单联系人"
            >
            </el-table-column>
            <el-table-column
                prop="contactTel"
                label="联系人电话"
            >
            </el-table-column>
            <el-table-column
                prop="pay"
                label="汇款方式"
            >
            </el-table-column>
            <el-table-column
                prop="createdAt"
                label="创建时间"
            >
            </el-table-column>
            <el-table-column
                label="操作"
                width="400"
            >
                <template slot-scope="scope">
                <el-button type="primary" size="mini"  @click="showInfoModal(scope.$index, scope.row)">员工资料</el-button>
                <el-button type="info" size="mini"  @click="showPwdModal(scope.$index, scope.row)">重设密码</el-button>
                <el-button type="warning" size="mini"  @click="showRoleModal(scope.$index, scope.row)">权限设置</el-button>
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
            <el-form ref="clientForm" :model="clientForm" :label-width="formLabelWidth" slot="content">
                <el-form-item label="客户名称"  prop="clientName">
                    <el-input v-model="clientForm.clientName"></el-input>
                </el-form-item>
                <el-form-item label="客户类型"  prop="clientType">
                    <el-select v-model="clientForm.clientTypeId" value="" placeholder="请选择">
                        <el-option
                        v-for="item in types"
                        :key="item._id"
                        :label="item.clientType"
                        :value="item._id"
                        @change="selectedTypeKey">
                        <span style="float: left">{{ item.clientType }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="客户地址"  prop="address">
                    <el-input v-model="clientForm.address"></el-input>
                </el-form-item>
                <el-form-item label="客户电话"  prop="tel">
                    <el-input v-model="clientForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="客户传真"  prop="fax">
                    <el-input v-model="clientForm.fax"></el-input>
                </el-form-item>
                <el-form-item label="订单联系人"  prop="contactPerson">
                    <el-input v-model="clientForm.contactPerson"></el-input>
                </el-form-item>
                <el-form-item label="联系人电话"  prop="contactTel">
                    <el-input v-model="clientForm.contactTel"></el-input>
                </el-form-item>
                <el-form-item label="汇款方式"  prop="pay">
                    <el-select v-model="clientForm.payId" placeholder="请选择">
                        <el-option
                        v-for="item in pays"
                        :key="item._id"
                        :label="item.paymentName"
                        :value="item._id"
                        @change="selectedPayKey">
                        <span style="float: left">{{ item.paymentName }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" native-type="reset">重置</el-button>
                <el-button type="primary" @click="addClient">保存</el-button>
            </div>
        </modal>
    </div>
</template>
<script>
import modal from '@/components/Modal'
import pagination from '@/components/Pagination'


export default {
    data(){
        return {
            total:0,
            pageCount:1,
            currentPage:1,
            pageSize: 10,
            formLabelWidth:'120px',
            addModalFlag: false,
            loadingFlag: false,
            clientForm:{
                clientTypeId:'',
                clientName:'',
                address:'',
                tel:'',
                fax:'',
                contactPerson:'',
                contactTel:'',
                payId:''
            },
            types:[],
            pays:[],
            tableData:[]
        }
    },
    methods: {
        modalChange(){
            this.addModalFlag = false
        },
        addModal(){
            this.addModalFlag = true;
            this.getTypes();
            this.getPays();
        },
        clickpageNum(){

        },
        handleSelectionChange(){

        },
        addClient(){
            this.$ajax.post('/clients/add',{
                clientName: this.clientForm.clientName,
                address: this.clientForm.address,
                tel: this.clientForm.tel,
                fax: this.clientForm.fax,
                contactPerson: this.clientForm.contactPerson,
                contactTel: this.clientForm.contactTel,
                clientTypeId: this.clientForm.clientTypeId,
                payId: this.clientForm.payId
            }).then(res => {
                if (res.data.status === '1') {
                this.$message({
                    message: res.data.msg,
                    type: 'success'
                })
                this.loadingData()
                this.addModalFlag = false
                this.resetForm('addUserForm')
                } else {
                this.$message.error(res.data.msg)
                }
            })
        },
        loadingData(){

        },
        getTypes(){
            this.$ajax.get('/clients/type').then(response => {
                let res = response.data.result;
                this.types = res;
            })
        },
        getPays(){
            this.$ajax.get('/pay/').then(response => {
                let res = response.data.result;
                this.pays = res;
            })
        },
        selectedTypeKey(item){
            this.clientForm.clientTypeId = item._id;
            console.log('clientTypeId  ' + item._id)
        },
        selectedPayKey(item){

        },
        resetForm(){
            
        }
    },
    components: {
      modal,
      pagination
    }
}
</script>