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
      >
      </el-table-column>
      <el-table-column
        prop="sales"
        label="销售代表"
      ></el-table-column>
      <el-table-column
        prop="clientName"
        label="客户名称"
      >
      </el-table-column>
      <el-table-column
        prop="clientType"
        label="客户类型"
      >
      </el-table-column>
      <el-table-column
        prop="orderDate"
        label="订购日期"
      >
      </el-table-column>
      <el-table-column
        prop="purchasing"
        label="采购次数"
      >
      </el-table-column>
      <el-table-column
        prop="productName"
        label="品名"
      >
      </el-table-column>
      <el-table-column
        prop="productNum"
        label="数量"
      >
      </el-table-column>
      <el-table-column
        prop="productPrice"
        label="单价"
      >
      </el-table-column>
      <el-table-column
        prop="receivables"
        label="应收金额"
      >
      </el-table-column>
      <el-table-column
        prop="billingDate"
        label="开票日期"
      >
      </el-table-column>
      <el-table-column
        prop="actuallyArrived"
        label="实际到账"
      >
      </el-table-column>
      <el-table-column
        prop="paymentDate"
        label="收款日期"
      >
      </el-table-column>
      <el-table-column
        prop="production"
        label="生产下单"
      >
      </el-table-column>
      <el-table-column
        prop="followUpType"
        label="跟单类型"
      >
      </el-table-column>
      <el-table-column
        prop="shipDate"
        label="发货日期"
      >
      </el-table-column>
      <el-table-column
        prop="arrivalDate"
        label="到货日期"
      >
      </el-table-column>
      <el-table-column
        prop="waybillNumber"
        label="运单号"
      >
      </el-table-column>
      <el-table-column
        prop="shipping"
        label="运费"
      >
      </el-table-column>
      <el-table-column
        prop="courierCompany"
        label="快递公司"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="400"
      >
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
                   <template slot="prepend">TSB</template>
                </el-input>
            </el-form-item>
            <el-form-item label="销售代表"  prop="sales">
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
          <el-form-item label="客户名称"  prop="clientName">
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
          <el-form-item label="客户类型"  prop="clientType">
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
               <el-input-number v-model="orderForm.receivables" :disabled="true" @change="handlePurchasingChange" :min="1" :max="2000" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="产品名称"  prop="product">
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
          <el-form-item label="跟单类型"  prop="followUpType">
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
                receivables:0,
                billingDate:'',
                actuallyArrived:0,
                paymentDate:'',
                production:'',
                followUpTypeId:'',//id
                shipDate:'',
                arrivalDate:'',
                waybillNumber:'',
                shipping:0,
                courierCompany:''
            },
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
          this.orderForm.salesId = $event;
      },
      selectedClientNameKey($event){
          this.orderForm.clientNameId = $event;
      },
      selectedClientTypeKey($event){
          this.orderForm.clientTypeId = $event;
      },
      selectedFollowUpTypeKey($event){
          this.orderForm.followUpTypeId = $event;
      },
      selectedProductKey(){
          this.orderForm.productId = $event;
      },
      getOrderDade(val){
          this.orderForm.orderDate = val;
          console.log('orderDate   ' + val)
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
        // this.loadingFlag = true;
      },
      addOrder(formName){
        this.$refs[formName].validate((valid) => {
            if(valid){
              
                this.$ajax.post('/order/add',{
                    contractNo: this.orderForm.contractNo,
                    sales: this.orderForm.salesId,
                    clientName: this.orderForm.clientNameId,
                    clientType: this.orderForm.clientTypeId,
                    orderDate: this.orderForm.orderDate,
                    purchasing: this.orderForm.purchasing,
                    product: this.orderForm.productId,
                    receivables: this.orderForm.receivables,
                    billingDate: this.orderForm.billingDate,
                    actuallyArrived: this.orderForm.actuallyArrived,
                    paymentDate: this.orderForm.paymentDate,
                    production: this.orderForm.production,
                    followUpType: this.orderForm.followUpTypeId,
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
      showRemoveModal(){

      },
      resetForm(){

      }
    }
}
</script>
<style lang="stylus" scoped>

</style>