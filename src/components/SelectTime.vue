<template>
    <div class="child">
        <span>{{ msg }}</span>
        <el-date-picker
            type="datetimerange"
            v-model="time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间">
        </el-date-picker>
        <el-button type="primary" size="small" @click="changeData">查询</el-button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                time:this.data,
            }
        },
        props:['data','msg'],
        methods:{
            changeData(){
                this.$emit('childMsg',this.time);
            }
        },
    }
</script>

<style lang="less" scoped>
    .child{
        display: flex;
        span{
            width: 70px;
            line-height: 40px;
            text-align: right;
            margin-right: 10px;
        }
        .el-button{
            margin-left: 10px;
        }
    }
</style>