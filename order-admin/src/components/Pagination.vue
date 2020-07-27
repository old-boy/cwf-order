<template>
    <div class="block">
        <span class="demonstration">共{{total}}条</span>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :page-count="pageCount"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            >
        </el-pagination>
    </div>
</template>
<script>
export default {
    name: 'pagination',
    props:['total','pageCount','currentPage','pageSize'],
    data() {
        return {
            
        }
    },
    methods: {
        handleCurrentChange(index){
            this.$emit('clickpageNum',index)
        }
    }
}
</script>
<style scoped>
    .block{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
</style>
