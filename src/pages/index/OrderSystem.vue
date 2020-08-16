<template>
    <div id="system">
        <div>
           <Time :data ='value' msg='时间范围' @childMsg ="getChildMsg" />
        </div>
        <div id="myCharts" ref="myCharts"></div>
    </div>
</template>

<script>
    import{$ordertotal} from '@/api/apis';
    import Time from '@/components/SelectTime';

    export default {
        components:{
            Time,
        },
        data(){
            return{
                value: ['2020-1-4 8:40:00', '2020-6-5 8:40:00'],
            }
        },
        mounted(){
            this.myCharts = this.$echarts.init(this.$refs.myCharts);
            this.addCharts();
        },
        methods:{
            // 渲染图表
            addCharts(){
                let arr;
                if(this.value){
                    arr = [this.$moment(this.value[0]).format('YYYY-MM-DD HH:mm:ss'),this.$moment(this.value[1]).format('YYYY-MM-DD HH:mm:ss')]
                }else
                    arr =[];
                $ordertotal(JSON.stringify(arr)).then(res =>{
                    let options = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                crossStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        legend: {
                            data: ['销售额']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: res.data.data.map( item => this.$moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss')),
                                axisPointer: {
                                    type: 'shadow'
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '金额',
                            },
                        ],
                        series: [
                            {
                                name: '销售额',
                                type: 'bar',
                                data: res.data.data.map( item =>item.orderAmount),
                            },
                        ]
                    };
                    this.myCharts.setOption(options);
                });
            },
            // 获取子组件的值
            getChildMsg(data){
                this.value = data;
            },
        },
        watch:{
            value(){
                this.addCharts();
            }
        }
    }
</script>

<style lang="less" scoped>
    #system{
        padding: 20px;
        #myCharts{
            background-color: #fff;
            margin-top: 50px;
            width: 100%;
            height: 600px;
        }
        .el-button{
            margin-left: 10px;
        }
    }
</style>