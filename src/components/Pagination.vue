<template>
    <el-pagination
        :page-sizes="pageList.page_sizes"
        :page-size="pageList.page_size"
        :current-page="pageList.current_page"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :layout="pageList.layout"
        :total="pageList.total">
    </el-pagination>
</template>

<script>
    export default {
        data(){
          return{
            pageList: this.msg,
          }
        },
        props:['msg'],
        methods: {
            handleSizeChange(val) {
              this.pageList.page_size= val;
              this.$emit('handSizeChange',this.pageList);
            },
            handleCurrentChange(val) {
              this.pageList.current_page = val;
              this.$emit('handCurrentChange',this.pageList);
            }
        },
    }
</script>

<style lang="less" scoped>
  .el-pagination{
      background-color: #fff;
      height: 40px;
  }
</style>