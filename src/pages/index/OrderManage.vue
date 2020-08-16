<template>
    <div id="order">
        <p>
            订单号<el-input v-model="orderNo" placeholder="订单号"></el-input>
            收货人<el-input v-model="consignee" placeholder="收货人"></el-input>
            手机号<el-input v-model="phone" placeholder="手机号"></el-input>
            订单状态<el-select v-model="orderState" placeholder="订单状态">
                <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
        </p>
        <!-- 时间选择器 -->
        <Time :data ='date' msg='选择时间:' @childMsg ="orderSearch" />
        <!-- 表格 -->
        <el-table 
        :data="tableData"
        border :style="{height:height}"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading">
            <el-table-column fixed prop="orderNo" label="订单号" width="150">

            </el-table-column>

            <el-table-column prop="orderTime" label="下单时间" width="200">

            </el-table-column>

            <el-table-column prop="phone" label="手机号" width="180">

            </el-table-column>

            <el-table-column prop="consignee" label="收货人" width="180">

            </el-table-column>
            
            <el-table-column prop="deliverAddress" label="配送地址" width="180">

            </el-table-column>

            <el-table-column prop="deliveryTime" label="送达时间" width="200">

            </el-table-column>
            <el-table-column prop="remarks" label="用户备注">

            </el-table-column>
            <el-table-column prop="orderAmount" label="订单金额">

            </el-table-column>
            <el-table-column prop="orderState" label="订单状态">

            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small" @click="clickChange(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table> 
        <!-- 修改/查看商品 -->
        <el-dialog :title="orderList.state ? '修改订单':'订单详情'" :visible.sync="dialogFormVisible">
            <el-form class="demo-table-expand">
                <!-- 订单号 -->
                <el-form-item label="订单号">
                        <span v-if="!orderList.state">{{ orderList.orderNo }}</span>
                        <el-input v-model="orderList.orderNo" v-else></el-input>
                </el-form-item>
                <!-- 下单时间 -->
                <el-form-item label="下单时间">
                        <span v-if="!orderList.state">{{ orderList.orderTime }}</span>
                        <el-input v-model="orderList.orderTime" v-else></el-input>
                </el-form-item>
                <!-- 手机号 -->
                <el-form-item label="手机号">
                        <span v-if="!orderList.state">{{ orderList.phone }}</span>
                        <el-input v-model="orderList.phone" v-else></el-input>
                </el-form-item>
                <!-- 收货人 -->
                <el-form-item label="收货人">
                        <span v-if="!orderList.state">{{ orderList.consignee }}</span>
                        <el-input v-model="orderList.consignee" v-else></el-input>
                </el-form-item>
                <!-- 配送地址 -->
                <el-form-item label="配送地址">
                        <span v-if="!orderList.state">{{ orderList.deliverAddress }}</span>
                        <el-input v-model="orderList.deliverAddress" v-else></el-input>
                </el-form-item>
                <!-- 送达时间 -->
                <el-form-item label="送达时间">
                        <span v-if="!orderList.state">{{ orderList.deliveryTime }}</span>
                        <el-input v-model="orderList.deliveryTime" v-else></el-input>
                </el-form-item>
                <!-- 用户备注 -->
                <el-form-item label="用户备注">
                        <span v-if="!orderList.state">{{ orderList.remarks }}</span>
                        <el-input v-model="orderList.remarks" v-else></el-input>
                </el-form-item>
                <!-- 订单金额 -->
                <el-form-item label="订单金额">
                        <span v-if="!orderList.state">{{ orderList.orderAmount }}</span>
                        <el-input v-model="orderList.orderAmount" v-else></el-input>
                </el-form-item>
                <!-- 订单状态 -->
                <el-form-item label="订单状态">
                        <span v-if="!orderList.state">{{ orderList.orderState }}</span>
                        <el-input v-model="orderList.orderState" v-else></el-input>
                </el-form-item>
            </el-form>
             <div slot="footer" class="dialog-footer">
                 <el-button @click="dialogFormVisible = false" v-show="orderList.state">取 消</el-button>
                <el-button type="primary" @click="succeedChange" v-show="orderList.state">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 分页器 -->
        <Page :msg ="pageList" @handSizeChange="SizeChange" @handCurrentChange ="CurrentChange" />
    </div>
</template>

<script>
    import {$orderList,$orderDetail,$orderEdit} from '@/api/apis';
    import Time from '@/components/SelectTime';
    import Page from '@/components/Pagination';

    export default {
        components:{
            Time,
            Page,
        },
        data(){
            return{
                orderNo:'', //订单号
                consignee:'', //收货人
                phone:'', //手机号
                orderState:'', //订单状态
                pageList:{
                    page_sizes:[5, 10, 15, 20, 30, 40], 
                    page_size: 5, //每页条数
                    current_page: 1, //页数
                    layout: "total, sizes, prev, pager, next, jumper", 
                    total: null,//总条数
                }, 
                tableData: [], //数据
                orderList:[], //订单详情
                options:['已完成','派送中','已受理','全部'], //订单状态数组
                dialogFormVisible: false, //显示与隐藏
                date: '', //日期
                loading:true, //是否加载
                height:'500px',
            }
        },
        methods: {
            // 获取数据
            getData(){
                this.loading = true;
                let obj = {};
                let {orderNo,consignee,phone,orderState,date} = this;
                obj.currentPage = this.pageList.current_page;
                obj.pageSize = this.pageList.page_size;
                if(orderNo!='') obj.orderNo = orderNo;
                if(consignee!='') obj.consignee = consignee;
                if(phone!='') obj.phone = phone;
                if(orderState!='' && orderState!='全部') obj.orderState = orderState;
                if(date){
                    date[0] =this.$moment(date[0]).format('YYYY-MM-DD HH:mm:ss');
                    date[1] =this.$moment(date[1]).format('YYYY-MM-DD HH:mm:ss');
                    obj.date = JSON.stringify(date);
                }
                $orderList(obj).then(res =>{
                    let arr = res.data.data.map(item =>{
                        item.deliveryTime = this.$moment(item.deliveryTime).format('YYYY-MM-DD HH:mm:ss');
                        item.orderTime = this.$moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss');
                        return item;
                    })
                    this.height = null;
                    this.tableData = arr;
                    this.pageList.total = res.data.total;
                    this.loading = false;
                })
            },
            // 订单详情
            handleClick(row){
                $orderDetail(row.id).then(res =>{
                    let arr = res.data.data
                    arr.deliveryTime = this.$moment(arr.deliveryTime).format('YYYY-MM-DD HH:mm:ss');
                    arr.orderTime = this.$moment(arr.orderTime).format('YYYY-MM-DD HH:mm:ss');
                    arr.state = false;
                    this.orderList = arr;
                    this.dialogFormVisible = true;
                })
            },
            // 修改订单
            clickChange(row){
                let arr = {...row};
                arr.deliveryTime = this.$moment(arr.deliveryTime).format('YYYY-MM-DD HH:mm:ss');
                arr.orderTime = this.$moment(arr.orderTime).format('YYYY-MM-DD HH:mm:ss');
                arr.state = true;
                this.orderList = arr;
                this.dialogFormVisible = true;
            },
            // 修改成功
            succeedChange(){ 
                $orderEdit(this.orderList).then(res =>{
                    if(res.data.code == 0){
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.dialogFormVisible = false;
                        this.getData();
                    }else
                        this.$message.error(res.data.msg);
                })
            },
            // 条数切换
            CurrentChange(val){
                this.pageList = val;
                this.getData();
            },
            // 页数切换
            SizeChange(val){
                this.pageList = val;
                this.getData();
            },
            // 查询订单
            orderSearch(data){
                this.date = data;
                this.getData()
            }
        },
        created(){
            this.getData();
        }
    }
</script>

<style lang="less" scoped>
    #order{
        background-color: #fff;
        padding: 25px 5px;
        .el-input,.el-select{
            width: 254px;
            margin: 0 10px 10px;
        }
        .el-button--small{
            width: 50px;
            margin-left: 10px;
        }
        .el-table{
            margin: 80px 0 50px;
        }
        .demo-table-expand{
            display: flex;
            flex-wrap: wrap;
        }
        .el-form-item{
            width: 45%;
        }
    }
</style>