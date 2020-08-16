<template>
    <div>
        <div style="display:flex">
            <Time :data = 'value1' msg='时间范围'/>
        </div>
        <div id="myCharts" ref="myCharts"></div>
    </div>
</template>

<script>
    import Time from '@/components/SelectTime';
    export default {
        components:{
            Time,
        },
        data(){
            return{
                value1: ['2020-08-10 08:30:00','2020-08-16 20:00:00'],
            }
        },
        mounted(){
            const  myCharts = this.$echarts.init(this.$refs.myCharts);
            let options = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow' 
                    }
                },
                legend: {
                    data: ['冒菜', '烤串','功夫腿排套餐','青椒肉丝炒饭','鱼香肉丝盖饭']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五','周六','周日']
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: '冒菜',
                        type: 'bar',
                        data: [50, 42, 33, 18, 40, 46, 50]
                    },
                    {
                        name: '烤串',
                        type: 'bar',
                        data: [20, 18, 15, 18, 24, 30, 42]
                    },
                    {
                        name: '功夫腿排套餐',
                        type: 'bar',
                        data: [50, 42, 33, 18, 59, 16, 23]
                    },
                    {
                        name: '青椒肉丝炒饭',
                        type: 'bar',
                        data: [23, 37, 13, 45, 41, 56, 19]
                    },
                    {
                        name: '鱼香肉丝盖饭',
                        type: 'bar',
                        data: [60, 80, 45, 35, 47, 56, 76],
                        markLine: {
                            lineStyle: {
                                type: 'dashed'
                            },
                            data: [
                                [{type: 'min'}, {type: 'max'}]
                            ]
                        }
                    }
                ]
            };
            myCharts.setOption(options);
        }
    }
</script>

<style lang="less" scoped>
    .el-button{
        margin-left: 5px;
    }
    #myCharts{
        height: 650px;
        width: 100%;
        padding: 10px;
        margin-top: 40px;
        box-sizing: border-box;
        background-color: #fff;
    }
</style>