<template>
  <div>
    <el-row class="source">
      <el-col :span="12">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>合同列表</el-breadcrumb-item>
          </el-breadcrumb>
      </el-col>
      <el-col :span="1" :offset="10">
          <el-button type="success" size="mini">添加</el-button>
      </el-col>
    </el-row>
    </div>
</template>
<script>


export default {
    data(){
        return {
            
        }
    }
}
</script>