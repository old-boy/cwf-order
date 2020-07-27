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
          <el-button type="success" size="mini">添加</el-button>
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
        prop="contractNum"
        label="合同号"
      >
      </el-table-column>
      <el-table-column
        prop="seller"
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
        prop="purchaseNum"
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
        prop="unitPrice"
        label="单价"
      >
      </el-table-column>
      <el-table-column
        prop="accountsReceivable"
        label="应收金额"
      >
      </el-table-column>
      <el-table-column
        prop="invoicingDate"
        label="开票日期"
      >
      </el-table-column>
      <el-table-column
        prop="accountsActual"
        label="实际到账"
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
    </div>
</template>
<script>


export default {
    data(){
        return {
            loadingFlag:false,
            tableData:[],
            orderFormData:[
              {
                contractId:TSB20020020,
                contractNum:'TSB20020020',
                seller:'LYNN',
                clientName:'定州东方铸造有限公司',
                clientType:'A',
                orderDate:'2020/2/25',
                purchaseNum:"20",
                productName:"Dry Dragon-1000",
                productNum:700,
                unitPrice:'￥35.8',
                accountsReceivable:"￥21480.00",
                accountsActual:"￥21480.00",
                invoicingDate:"2020/05/26",
                createAt:"2020/2/25",
                updateAt:""
              },
              {
                contractId:TSB20020019,
                contractNum:'TSB20020021',
                seller:'LYNN',
                clientName:'百瑞美特殊材料（苏州）有限公司',
                clientType:'B',
                orderDate:'2020/2/25',
                purchaseNum:"2",
                productName:"Dry Fashion-50",
                productNum:250,
                unitPrice:'￥2.5',
                accountsReceivable:"￥625.00",
                accountsActual:"￥625.00",
                invoicingDate:"2020/05/26",
                createAt:"2020/2/25",
                updateAt:"2020/05/26"
              }
            ]
        }
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
      showInfoModal(){

      },
      showPwdModal(){

      },
      showRemoveModal(){

      }
    },

    
}
</script>