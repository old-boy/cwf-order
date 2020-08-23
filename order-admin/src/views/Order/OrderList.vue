<template>
  <div>
    <el-row class="source">
      <el-col :span="12">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
          </el-breadcrumb>
      </el-col>
      <el-col :span="1" :offset="10">
          <el-button type="success" size="mini"  @click="addModal">添加</el-button>
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
        prop="contractNo"
        label="合同号"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="sales"
        label="销售代表"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="clientName"
        label="客户名称"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="clientType"
        label="客户类型"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="orderDate"
        label="订购日期"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="productName"
        label="品名"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="productNum"
        label="数量"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="productPrice"
        label="单价"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="receivables"
        label="应收金额"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="billingDate"
        label="开票日期"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="actuallyArrived"
        label="实际到账"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="paymentDate"
        label="收款日期"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="production"
        label="生产下单"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="followUpType"
        label="跟单类型"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="shipDate"
        label="发货日期"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="arrivalDate"
        label="到货日期"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="waybillNumber"
        label="运单号"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="shipping"
        label="运费"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="courierCompany"
        label="快递公司"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="更新时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button type="warning" size="mini"  @click="showEditModal(scope.$index, scope.row)">编辑</el-button>
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
       <modal :dialogFormVisible="addModalFlag" @modalToggle="modalChange" :title="'新增'" :width="modalWidth" class="modal">
        <el-form ref="orderForm" :model="orderForm" :rules="rules" :label-width="formLabelWidth" slot="content">
            <el-form-item label="合同号"  prop="contractNo">
                <el-input v-model="orderForm.contractNo">
                   
                </el-input>
            </el-form-item>
            <el-form-item label="销售代表"  prop="salesId">
              <el-select v-model="orderForm.salesId" placeholder="请选择" @change="selectedSalesKey($event)">
                  <el-option
                  v-for="item in salesArr"
                  :key="item._id"
                  :label="item.account"
                  :value="item._id"
                  >
                  <span style="float: left">{{ item.account }}</span>
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="客户名称"  prop="clientNameId">
              <el-select v-model="orderForm.clientNameId" placeholder="请选择" @change="selectedClientNameKey($event)">
                  <el-option
                  v-for="item in clientNameArr"
                  :key="item._id"
                  :label="item.clientName"
                  :value="item._id"
                  >
                  <span style="float: left">{{ item.clientName }}</span>
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="客户类型"  prop="clientTypeId">
              <el-select v-model="orderForm.clientTypeId" placeholder="请选择" @change="selectedClientTypeKey($event)">
                  <el-option
                  v-for="item in clientTypeArr"
                  :key="item._id"
                  :label="item.clientType"
                  :value="item._id"
                  >
                  <span style="float: left">{{ item.clientType }}</span>
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="订购日期" prop="orderDate">
               <el-date-picker
                v-model="orderForm.orderDate"
                type="date"
                placeholder="选择日期"
                @change="getOrderDade" 
                value-format="yyyy-MM-dd">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="当日配送">
            <el-switch v-model="orderForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="订购次数" prop="purchasing">
               <el-input-number v-model="orderForm.receivables" :disabled="true" @change="handlePurchasingChange"></el-input-number>
          </el-form-item>
          <el-form-item label="产品名称"  prop="producId">
              <el-select v-model="orderForm.producId" placeholder="请选择" @change="selectedProductKey($event)">
                  <el-option
                  v-for="item in productArr"
                  :key="item._id"
                  :label="item.productName"
                  :value="item._id"
                  >
                  <span style="float: left">{{ item.productName }}</span>
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="应收金额" prop="receivables">
                <el-input v-model="orderForm.receivables">
                   <template slot="append">元</template>
                </el-input>
          </el-form-item>
          <el-form-item label="实际到帐" prop="actuallyArrived">
                <el-input v-model="orderForm.actuallyArrived">
                   <template slot="append">元</template>
                </el-input>
          </el-form-item>
          <el-form-item label="开票日期" prop="billingDate">
               <el-date-picker
                v-model="orderForm.billingDate"
                type="date"
                placeholder="选择日期"
                @change="getBillingDate" 
                value-format="yyyy-MM-dd">
              </el-date-picker>
          </el-form-item> 
           <el-form-item label="到账日期" prop="paymentDate">
               <el-date-picker
                v-model="orderForm.paymentDate"
                type="date"
                placeholder="选择日期"
                @change="getPaymentDate" 
                value-format="yyyy-MM-dd">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="生产下单" prop="production">
                <el-input v-model="orderForm.production">
                </el-input>
          </el-form-item>
          <el-form-item label="跟单类型"  prop="followUpTypeId">
              <el-select v-model="orderForm.followUpTypeId" placeholder="请选择" @change="selectedFollowUpTypeKey($event)">
                  <el-option
                  v-for="item in followUpTypeArr"
                  :key="item._id"
                  :label="item.orderType"
                  :value="item._id"
                  >
                  <span style="float: left">{{ item.orderType }}</span>
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="发货日期" prop="shipDate">
               <el-date-picker
                v-model="orderForm.shipDate"
                type="date"
                placeholder="选择日期"
                @change="getShipDate" 
                value-format="yyyy-MM-dd">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="到货日期" prop="arrivalDate">
               <el-date-picker
                v-model="orderForm.arrivalDate"
                type="date"
                placeholder="选择日期"
                @change="getArrivalDate" 
                value-format="yyyy-MM-dd">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="运单号" prop="waybillNumber">
               <el-input v-model="orderForm.waybillNumber">
                </el-input>
          </el-form-item>
          <el-form-item label="运费" prop="shipping">
                <el-input v-model="orderForm.shipping">
                   <template slot="append">元</template>
                </el-input>
          </el-form-item>
          <el-form-item label="快递公司" prop="courierCompany">
                <el-input v-model="orderForm.courierCompany">
                </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" native-type="reset" @click="resetForm('orderForm')">重置</el-button>
            <el-button type="primary" @click="addOrder('orderForm')">保存</el-button>
        </div>
    </modal>
    <modal :dialogFormVisible="removeModalFlag" @modalToggle="modalChange">
        <p slot="content" style="text-align: center;font-size: 20px;">
            是否删除订单？
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
            salesArr:[],
            clientNameArr:[],
            clientTypeArr:[],
            productArr:[],
            followUpTypeArr:[],
            orderId:'',
            orderForm:{
                contractNo:'',
                salesId:'',
                clientNameId:'',//id
                clientTypeId:'',//id
                orderDate:'',
                purchasing:'',
                productId:'',//id,根据 id 查name / num / price
                receivables:0.00,
                billingDate:'',
                actuallyArrived:0.00,
                paymentDate:'',
                production:'',
                followUpTypeId:'',//id
                shipDate:'',
                arrivalDate:'',
                waybillNumber:'',
                shipping:0.00,
                courierCompany:''
            },
            salesId:'',
            formLabelWidth: '120px',
            modalWidth:'600px',
            rules:{
                contractNo:[
                    { required: true, message: '请输入合同编号', trigger: 'blur' }
                ],
                sales:[
                    { required: true, message: '请选择销售代表', trigger: 'blur' }
                ],
                clientName:[
                    { required: true, message: '请选择客户名称', trigger: 'blur' }
                ],
                clientType:[
                    { required: true, message: '请选择客户类型', trigger: 'blur' }
                ],
                product:[
                    { required: true, message: '请选择产品名称', trigger: 'blur' }
                ],
                production:[
                    { required: true, message: '请填入生产下单', trigger: 'blur' }
                ],
                followUpType:[
                    { required: true, message: '请选择跟单类型', trigger: 'blur' }
                ],
                waybillNumber:[
                    { required: true, message: '请录入运单号', trigger: 'blur' }
                ],
                courierCompany:[
                    { required: true, message: '请输入快递公司', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
      this.loadingData();
    },
    computed: {
      
    },
    mounted() {
      
    },
    watch: {
      
    },
    methods: {
      handleSelectionChange(){

      },
      clickpageNum(){

      },
      
      modalChange(){
          this.addModalFlag = false;
          this.removeModalFlag = false;
          this.editModalFlag = false;
      },
      addModal(){
          this.addModalFlag = true;
          this.getClientType();
          this.getClientName();
          this.getSaler();
          this.getProductName();
          this.getFollowUpType();
          this.getOrderDade();
          this.getBillingDate();
          this.getPaymentDate();
          this.getArrivalDate();
      },
      showEditModal(){

      },
      selectedSalesKey($event){
          this.salesId = $event;
      },
      selectedClientNameKey($event){
          this.orderForm.clientNameId = $event;
          console.log('clientNameId  ' + this.orderForm.clientNameId)
      },
      selectedClientTypeKey($event){
          this.orderForm.clientTypeId = $event;
      },
      selectedFollowUpTypeKey($event){
          this.orderForm.followUpTypeId = $event;
      },
      selectedProductKey($event){
          this.orderForm.productId = $event;
      },
      getOrderDade(val){
          this.orderForm.orderDate = val;
      },
      getBillingDate(val){
          this.orderForm.billingDate = val;
      },
      getPaymentDate(val){
        this.orderForm.paymentDate = val;
      },
      getShipDate(val){
        this.orderForm.shipDate = val;
      },
      getArrivalDate(val){
        this.orderForm.arrivalDate = val;
      },
      getSaler(){
          this.$ajax.get('/users/').then(response => {
              let res = response.data.result;
              this.salesArr = res;
          })
      },
      getClientType(){
          this.$ajax.get('/clients/type').then(response => {
              let res = response.data.result;
              this.clientTypeArr = res;
          })
      },
      getClientName(){
          this.$ajax.get('/clients/').then(response => {
             let res = response.data.result;
             this.clientNameArr = res;
          })
      },
      getProductName(){
          this.$ajax.get('/product/').then(response => {
             let res = response.data.result;
             this.productArr = res;
          })
      },
      getFollowUpType(){
          this.$ajax.get('/order/type').then(response => {
              let res = response.data.result;
              this.followUpTypeArr = res;
          })
      },
      handlePurchasingChange(){

      },
      loadingData(){
        this.loadingFlag = true;
        this.$ajax.get('/order/').then(res => {
            this.loadingFlag = false;
            
            let data = res.data.result;
            console.log('data   ' + data)
            let arr = [];
            //根据 mongodb populate 查询不同表的数据
            for(var i = 0; i < data.length; i++){
                    let _id = data[i]._id;
                    let contractNo= data[i].contractNo;
                    let clientName = data[i].client.clientName;
                    let clientType = data[i].clientType.clientType;
                    let courierCompany = data[i].courierCompany;
                    let followUpType = data[i].followUpType.orderType;
                    let productName = data[i].product.productName;
                    let productNum = data[i].product.productNum;
                    let productPrice = data[i].product.productPrice + '元';
                    let production = data[i].production;
                    let purchasing = data[i].purchasing;
                    let receivables = data[i].receivables;
                    let actuallyArrived = data[i].actuallyArrived;
                    let sales = data[i].sales.account;
                    let shipping = data[i].shipping;
                    let waybillNumber = data[i].waybillNumber;

                    let arrivalDate = data[i].arrivalDate;
                    let billingDate = data[i].billingDate;
                    let orderDate = data[i].orderDate;
                    let paymentDate = data[i].paymentDate;
                    let shipDate = data[i].shipDate;
                    let updatedAt = data[i].updatedAt;
                    let createdAt = data[i].createdAt;

                    let dataEntity = {
                        _id,
                        contractNo,
                        clientName,
                        clientType,
                        courierCompany,
                        followUpType,
                        productName,
                        productNum,
                        productPrice,
                        production,
                        purchasing,
                        receivables,
                        actuallyArrived,
                        sales,
                        shipping,
                        waybillNumber,
                        arrivalDate,
                        billingDate,
                        orderDate,
                        paymentDate,
                        shipDate,
                        updatedAt,
                        createdAt
                    }
                    arr.push(dataEntity);
                };
                this.tableData = arr;
                this.total = arr.length;
        })
      },
      addOrder(formName){
        console.log('addOrder')
        this.$refs[formName].validate((valid) => {
            if(valid){
              
                this.$ajax.post('/order/add',{
                    contractNo: this.orderForm.contractNo,
                    salesId: this.orderForm.salesId,
                    clientNameId: this.orderForm.clientNameId,
                    clientTypeId: this.orderForm.clientTypeId,
                    orderDate: this.orderForm.orderDate,
                    purchasing: this.orderForm.purchasing,
                    productId: this.orderForm.productId,
                    receivables: this.orderForm.receivables,
                    billingDate: this.orderForm.billingDate,
                    actuallyArrived: this.orderForm.actuallyArrived,
                    paymentDate: this.orderForm.paymentDate,
                    production: this.orderForm.production,
                    followUpTypeId: this.orderForm.followUpTypeId,
                    shipDate: this.orderForm.shipDate,
                    arrivalDate: this.orderForm.arrivalDate,
                    waybillNumber: this.orderForm.waybillNumber,
                    shipping: this.orderForm.shipping,
                    courierCompany: this.orderForm.courierCompany
                }).then(res => {
                  console.log('order    ' + res)
                    if (res.data.status === '1') {
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    })
                    this.loadingData()
                    this.addModalFlag = false
                    this.resetForm('orderForm')
                    } else {
                    this.$message.error(res.data.msg)
                    }
                })
            }else{
              return false;
            }
        })
      },
      showRemoveModal(incex,row){
          this.removeModalFlag = true;
          this.orderId = row._id;
      },
      handleDelete(){
          this.$ajax.delete(`/order/del/${this.orderId}`,{
              params: {
                  id: this.orderId
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
      formatDate(curdateZ){
        var d = new Date(curdateZ);
        var year = d.getFullYear();
        var month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth();
        var day = d.getDay() < 10 ? '0' + d.getDay() : d.getDay();

      
        return year + '-' + month + '-' + day;
      },
      
      resetForm (formName) {
          this.$refs[formName].resetFields()
      }
    }
}
</script>
<style lang="stylus" scoped>

</style>