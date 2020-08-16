<template>
    <div id="index">
        <div>
            <Card v-for="(item,index) in list" :key="index" :msg='item'/>
        </div>
        <div id="myCharts" ref="myCharts"></div>
    </div>
</template>

<script>
    import Card from '@/components/Card';
    import {$totaldata} from '@/api/apis';

    export default {
        components:{
            Card,
        },
        data(){
            return{
                list:[
                    {class:'el-icon-document',title:'总订单',num:null,color:'#1E9BDD'},
                    {class:'el-icon-coin',title:'总销售额',num:null,color:'#D4237A'},
                    {class:'el-icon-s-order',title:'今日订单',num:null,color:'#1296DB'},
                    {class:'el-icon-coin',title:'今日销售额',num:null,color:'#1AFA29'},
                ],
                data:'',
            }
        },
        async mounted(){
            await $totaldata().then(res =>{
                this.data = res.data;
                this.list[0].num = res.data.totalOrder;
                this.list[1].num = res.data.totalAmount;
                this.list[2].num = res.data.todayOrder;
                this.list[3].num = res.data.totayAmount;
            })
            const  myCharts = this.$echarts.init(this.$refs.myCharts);
            let options = {
                title: {
                    text: '数据统计'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['总订单', '总销售额']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.data.xData
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '总订单',
                        type: 'line',
                        stack: '总量',
                        data: this.data.orderData
                    },
                    {
                        name: '总销售额',
                        type: 'line',
                        stack: '总量',
                        data: this.data.amountData
                    },
                ]
            };
            myCharts.setOption(options)
        },
    }
</script>

<style lang="less" scoped>
    #index{
        div{
            display: flex;
            justify-content: space-around;
            padding: 20px 0px;
        }
        #myCharts{
            margin: 30px 10px 0px;
            height: 500px;
            width: 100%;
            background-color: #fff;
        }
    }
</style>