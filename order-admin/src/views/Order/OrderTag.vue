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
        prop="tagNamg"
        label="标签名称"
      >
      </el-table-column>
      <el-table-column
        prop="tagType"
        label="标签类型"
      ></el-table-column>
      
      
      <el-table-column
        label="操作"
        width="400"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini"  @click="showInfoModal(scope.$index, scope.row)">编辑</el-button>
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
          tagNamg:"",
          tagType:""
        }
    },watch: {
      
    },
    methods: {
      handleSelectionChange(){

      },
      showInfoModal(){

      },
      showRemoveModal(){
        
      }
    },

}
</script>