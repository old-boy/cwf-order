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
                prop="typeName"
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
                prop="payName"
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
                <el-button type="primary" size="mini"  @click="editModal(scope.$index, scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="removeModal(scope.$index, scope.row)">删除</el-button>
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
            <el-form ref="clientForm" :rules="rules" :model="clientForm" :label-width="formLabelWidth" slot="content">
                <el-form-item label="客户名称"  prop="clientName">
                    <el-input v-model="clientForm.clientName"></el-input>
                </el-form-item>
                <el-form-item label="客户类型"  prop="typeName">
                    <el-select v-model="clientForm.clientTypeId" placeholder="请选择" @change="selectedTypeKey($event)">
                        <el-option
                        v-for="item in types"
                        :key="item._id"
                        :label="item.clientType"
                        :value="item._id"
                        >
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
                <el-form-item label="汇款方式"  prop="payName">
                    <el-select v-model="clientForm.payId" placeholder="请选择" @change="selectedPayKey($event)">
                        <el-option
                        v-for="item in pays"
                        :key="item._id"
                        :label="item.paymentName"
                        :value="item._id"
                        >
                        <span style="float: left">{{ item.paymentName }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" native-type="reset">重置</el-button>
                <el-button type="primary" @click="addClient('clientForm')">保存</el-button>
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
    data(){
        return {
            total:0,
            pageCount:1,
            currentPage:1,
            pageSize: 10,
            formLabelWidth:'120px',
            addModalFlag: false,
            loadingFlag: false,
            removeModalFlag:false,
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
            clientId:'',
            clientTypeId:'',
            payId:'',
            typeName:'',
            payName: '',
            types:[],
            pays:[],
            tableData:[],
            rules:{
                clientName:[
                    { required: true, message: '请输入客户名称', trigger: 'blur' }
                ],
                address:[
                    { required: true, message: '请输入客户地址', trigger: 'blur' }
                ],
                tel:[
                    { required: true, message: '请输入客户电话', trigger: 'blur' }
                ],
                fax:[
                    { required: false, message: '请输入传真', trigger: 'blur' }
                ],
                contactPerson:[
                    { required: true, message: '请输入联系人', trigger: 'blur' }
                ],
                contactTel:[
                    { required: true, message: '请输入联系人电话', trigger: 'blur' }
                ],
            }
        }
    },
    created() {
        this.loadingData();
        this.totalData();
    },
    methods: {
        modalChange(){
            this.addModalFlag = false;
            this.removeModalFlag = false;
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
        addClient(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    //其它关联的表要传id回去
                    this.$ajax.post('/clients/add',{
                        clientName: this.clientForm.clientName,
                        typeName: this.clientTypeId,
                        address: this.clientForm.address,
                        tel: this.clientForm.tel,
                        fax: this.clientForm.fax,
                        contactPerson: this.clientForm.contactPerson,
                        contactTel: this.clientForm.contactTel,
                        payName: this.payId
                    }).then(res => {
                        if (res.data.status === '1') {
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                        this.loadingData()
                        this.addModalFlag = false
                        this.resetForm('clientForm')
                        } else {
                        this.$message.error(res.data.msg)
                        }
                    })
                }else{
                    return false;
                }
            })
            
        },
        loadingData(){
            this.loadingFlag = true;
            this.$ajax.get('/clients/').then(res => {
                this.loadingFlag = false;
                console.log('客户表为  ' + res)
                let data = res.data.result;
                let arr = [];

                for(var i = 0; i < data.length; i++){
                    let _id = data[i]._id;
                    let clientName = data[i].clientName;
                    let typeName = data[i].typeName.clientType;
                    let address = data[i].address;
                    let tel = data[i].tel;
                    let fax = data[i].fax;
                    let contactPerson = data[i].contactPerson;
                    let contactTel = data[i].contactTel;
                    let payName = data[i].payName.paymentName;
                    let createdAt = data[i].createdAt;

                    let dataEntity = {
                        _id,
                        clientName,
                        typeName,
                        address,
                        tel,
                        fax,
                        contactPerson,
                        contactTel,
                        payName,
                        createdAt
                    }
                    arr.push(dataEntity);
                };
                this.tableData = arr;
                this.totalData();
            });
        },
        editModal(){

        },
        removeModal(incex,row){
            this.removeModalFlag = true;
            this.clientId = row._id;
        },
        handleDelete(){
            this.$ajax.delete(`/clients/del/${this.clientId}`,{
                params: {
                    id: this.clientId
                }
            }).then(res => {
                if (res.data.status === '1') {
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    })
                    // 重新获取新数据
                    this.loadingData();
                    this.removeModalFlag = false
                    } else {
                    this.removeModalFlag = false
                }
            })
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
        selectedTypeKey($event){
            this.clientForm.clientTypeId = $event;
       
            this.$ajax.get(`/clients/type/${this.clientForm.clientTypeId}`,{
                id: this.clientForm.clientTypeId
            }).then(res => {
                this.typeName = res.data.result.clientType;
                this.clientTypeId = res.data.result._id;
            })
        },
        selectedPayKey($event){
            this.clientForm.payId = $event;

            this.$ajax.get(`/pay/${this.clientForm.payId}`,{
                id: this.clientForm.payId
            }).then(res => {
                this.payName = res.data.result.paymentName;
                this.payId = res.data.result._id;
            })
        },
        totalData(){
             this.$ajax.get('/clients/total').then(response => {
                this.total = response.data.total;
            })
        },
        resetForm (formName) {
            this.$refs[formName].resetFields()
        }
    },
    components: {
      modal,
      pagination
    }
}
</script>