<template>
    <div>
        <p class="title">商品列表</p>
        <el-table 
        :data="tableData" 
        :style="{height:height}" 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading">
             <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="商品 ID">
                        <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="商品分类">
                        <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="商品图片">
                        <img :src="shopImg+props.row.imgUrl" alt="">
                    </el-form-item>
                    <el-form-item label="商品评价">
                        <span>{{ props.row.rating }}</span>
                    </el-form-item>
                    <el-form-item label="商品描述">
                        <span>{{ props.row.goodsDesc }}</span>
                    </el-form-item>
                    <el-form-item label="商品名称">
                        <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <span>{{ props.row.price }}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <span>{{ props.row.ctime }}</span>
                    </el-form-item>
                    <el-form-item label="商品销量">
                        <span>{{ props.row.sellCount }}</span>
                    </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称">

            </el-table-column>
            <el-table-column prop="category" label="所属分类">

            </el-table-column>
            <el-table-column label="商品价格" prop="price">

            </el-table-column>
            <el-table-column label="商品图片">
                <template slot-scope="scope">
                    <img :src="shopImg+scope.row.imgUrl">
                </template>
            </el-table-column>
            <el-table-column label="商品描述" prop="goodsDesc">

            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary"  @click="clickEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="clickDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <Page :msg ="pageList" @handSizeChange="SizeChange" @handCurrentChange ="CurrentChange" />
        <!-- 修改商品 -->
        <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
            <el-form>
                <!-- 商品名称 -->
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="list.name" placeholder="商品名称"></el-input>
                </el-form-item>
                <!-- 商品分类 -->
                <el-form-item label="商品分类" :label-width="formLabelWidth">
                    <el-select v-model="list.category">
                        <el-option
                        v-for="item in options"
                        :key="item.cateName"
                        :label="item.cateName"
                        :value="item.cateName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 商品价格 -->
                <el-form-item label="商品价格" :label-width="formLabelWidth">
                    <el-input-number v-model="list.price" :min="1"></el-input-number>
                </el-form-item>
                <!-- 图片地址 -->
                <el-form-item label="图片地址" :label-width="formLabelWidth">
                    <el-upload 
                        :action="goods_Upload" 
                        list-type="picture-card"
                        :show-file-list="false"
                        :on-success="imgSuccess"
                        >
                            <img v-if="list.imgUrl" :src="shopImg+list.imgUrl" class="avatar">
                            <i class="el-icon-plus" v-else></i>
                    </el-upload>
                </el-form-item>
                <!-- 商品描述 -->
                <el-form-item label="商品描述" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="list.goodsDesc" show-word-limit size=medium>

                    </el-input>
                </el-form-item>
            </el-form>
            <!-- 确定/取消 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeMsg">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {$goodsList,$delGoods,$categories,$editGoods,shopImg,goods_Upload} from '@/api/apis';
    import Page from '@/components/Pagination';

    export default {
        components:{
            Page,
        },
        data() {
            return {
                pageList:{
                    page_sizes:[5, 10, 15, 20, 30, 40], 
                    page_size: 5, //每页条数
                    current_page: 1, //页数
                    layout: "total, sizes, prev, pager, next, jumper", 
                    total: null,//总条数
                }, 
                tableData: [], //数据
                shopImg:shopImg, //图片默认地址
                goods_Upload, //商品图片接口
                dialogFormVisible: false, //显示与隐藏
                list :[],
                options:[], //商品分类列表
                formLabelWidth: '120px',
                loading:true, //是否显示加载
                height:'450px', //高度
            }
        },
        methods:{
            // 获取商品接口
            getData(){
                this.loading = true;
                $goodsList(this.pageList.current_page,this.pageList.page_size).then(res =>{
                    let arr = res.data.data;
                    arr.forEach(item =>{
                        item.ctime = this.$moment(item.ctime).format('YYYY-MM-DD HH:mm:ss');
                    })
                    this.height = null;
                    this.tableData = arr;
                    this.pageList.total = res.data.total;
                    this.loading = false;
                })
            },
            // 改变页数
            CurrentChange(val){
                this.pageList = val;
                this.getData();
            },
            // 改变条数
            SizeChange(val){
                this.pageList = val;
                this.getData();
            },
            // 删除商品
            clickDelete(row){
                this.$confirm('是否删除该商品?', '系统提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                }).then(() => {
                    $delGoods(row.id).then(res =>{
                        if(res.data.code == 0){
                            this.$message({
                                message: res.data.msg,
                                type: 'success',
                            });
                            this.getData();
                        }else
                            this.$message.error(res.data.msg)
                    })
                })         
                
            },
            // 修改商品
            clickEdit(row){
                this.dialogFormVisible = true;
                $categories().then( res =>{
                    this.options = res.data.categories
                })
                this.list = {...row};
            },
            // 更换商品图片
            imgSuccess(res){
                this.list.imgUrl = res.imgUrl; 
            },
            // 确定修改
            changeMsg(){
                $editGoods(this.list).then(res =>{
                    if(res.data.code == 0){
                        this.$message({
                            message: res.data.msg,
                            type: 'success',
                        })
                        this.dialogFormVisible = false;
                        this.getData();
                    }else
                        this.$message.error(res.data.msg);
                })
            }
        },
        created(){
            this.getData();
        }
    }
</script>


<style lang="less" scoped>
    .title{
        height: 50px;
        line-height: 50px;
        text-indent: 20px;
        margin-bottom: 2px;
        background-color: #fff;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .el-table__row{
        img{
            width: 50px;
            height: 50px;
        }
    }
    .el-pagination{
        background-color: #fff;
        padding: 20px;
    }
    .el-input{
        width: 300px;
    }
    img{
        width: 140px;
        height: 140px;
    }
</style>