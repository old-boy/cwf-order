<template>
  <div>
    <el-row class="source">
      <el-col :span="12">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>新增合同</el-breadcrumb-item>
          </el-breadcrumb>
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