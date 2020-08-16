<template>
    <div>
        <p class="title">商品列表</p>
        <div class="product">
            <div>
                <span>商品名称</span>
                <el-input v-model="shopMsg.name" placeholder="商品名称"></el-input>
            </div>
            <!-- 商品价格 -->
            <div>
                <span>商品分类</span>
                <el-select v-model="shopMsg.category" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.cateName"
                    :label="item.cateName"
                    :value="item.cateName">
                    </el-option>
                </el-select>
            </div>
            <!-- 商品价格 -->
            <div>
                <span>商品价格</span>
                <el-input-number v-model="shopMsg.price" :min="1"></el-input-number>
            </div>
            <!-- 商品图片 -->
            <div>
                <span>商品图片</span>
                <el-upload 
                :action="goods_Upload" 
                list-type="picture-card"
                :show-file-list="false"
                :on-success="imgSuccess"
                :before-upload="beforeUpload"
                >
                    <img v-if="shopMsg.imgUrl" :src="shopImg+shopMsg.imgUrl" class="avatar">
                    <i class="el-icon-plus" v-else></i>
                </el-upload>
            </div>
            <!-- 商品描述 -->
            <div>
                <span>商品描述</span>
                <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="shopMsg.goodsDesc"
                    show-word-limit
                    size=medium
                >
                </el-input>
            </div>
            <!-- 添加商品 -->
            <el-button type="primary" @click="addGoods">添加商品</el-button>
        </div>
    </div>
</template>

<script>
    import {$categories,$addGoods,shopImg,goods_Upload} from '@/api/apis';

    export default {
        data(){
            return{
                shopMsg:{
                    name:'', //商品名称
                    category: '',   //商品分类
                    price: 1, //商品价格
                    goodsDesc:'', //商品描述
                    imgUrl:'', //图片地址
                },
               options:[], //商品分类列表
               shopImg, //默认商品地址
               goods_Upload, //商品图片接口
            }
        },
        created(){
            $categories().then( res =>{
                this.options = res.data.categories;
                this.shopMsg.category = this.options[0].cateName;
            })
        },
        methods:{
            // 添加商品
            addGoods(){
                $addGoods(this.shopMsg).then(res =>{
                    if(res.data.code == 0){
                         this.$message({
                            message: res.data.msg,
                            type: 'success',
                        })
                        this.$router.push('/index/ProductList');
                    }else
                        this.$message.error(res.data.msg);
                })
                
            },
            // 商品图片上传
            imgSuccess(res){
                this.shopMsg.imgUrl = res.imgUrl
            },
            // 检测文件类型/格式
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
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
    .product{
        padding: 20px;
        background-color: #fff;
        >div{
            margin-bottom: 25px;
            display: flex;
            span{
                width: 70px;
                line-height: 40px;
                text-align: right;
                margin-right: 10px;
            }
            img{
                width: 150px;
                height: 150px;
            }
            .el-input{
                width: 380px;
            }
            .el-textarea{
                width: 380px;
                vertical-align:top;
            }
        }
        .el-button{
                margin-left: 50px;
        }
    }
</style>