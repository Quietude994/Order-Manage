<template>
    <div id="store">
        <div class="title" >
            店铺管理
            <el-button type="primary" size="small" @click="shopcChange">{{list.state? '编辑':'保存'}}</el-button>
        </div>
        <el-form class="content" :disabled='list.state'>
            <!-- 店铺名称 -->
            <div>
                <span>店铺名称</span>
                <el-input v-model="list.name"></el-input>
            </div>
            <!-- 店铺公告 -->
            <div>
                <span>店铺公告</span>
                <el-input type="textarea" v-model="list.bulletin" :rows="5">

                </el-input>
            </div>
            <!-- 店铺头像 -->
            <div class="portrait">
                <span>店铺头像</span>
                <el-upload
                    class="avatar-uploader"
                    action="http://127.0.0.1:5000/shop/upload"
                    :on-success ="uploadAvatar"
                    :show-file-list="false">
                    <img v-if="list.avatar" :src="imgsrc+list.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <!-- 店铺图片 -->
            <div>
                <span>店铺图片</span>
                <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/shop/upload"
                :on-success ="uploadPic"
                :on-remove="handleRemove"
                :file-list="picsList"
                list-type="picture-card">
                <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <!-- 配送费 -->
            <div>
                <span>配送费</span>
                <el-input v-model="list.deliveryPrice"></el-input>
            </div>
            <!-- 配送价格 -->
            <div>
                <span>配送价格</span>
                <el-input v-model="list.minPrice"></el-input>
            </div>
            <!-- 送达时间 -->
            <div>
                <span>送达时间</span>
                <el-input v-model="list.deliveryTime"></el-input>
            </div>
            <!-- 配送描述 -->
            <div>
                <span>配送描述</span>
                <el-input v-model="list.description"></el-input>
            </div>
            <!-- 店铺评分 -->
            <div>
                <span>店铺评分</span>
                <el-input v-model="list.score"></el-input>
            </div>
            <!-- 销量 -->
            <div>
                <span>销量</span>
                <el-input v-model="list.sellCount"></el-input>
            </div>
            <!-- 活动 -->
            <div>
                <span>活动</span>
                <el-checkbox-group v-model="list.supports" v-if="list.supports">
                    <el-checkbox v-for="(item) in List" :key="item" :label="item"></el-checkbox>
                </el-checkbox-group>
            </div>
            <!-- 选择时间 -->
            <label>
                营业时间:
                <el-time-picker
                is-range
                v-model="list.date"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
                </el-time-picker>
            </label>
        </el-form>
    </div>
</template>

<script>
    import{$shopInfo,$shopEdit} from '@/api/apis';

    export default {
        data(){
            return{
                list:[], // 数据数组
                picsList:[], //回填图片数组
                imgsrc:'http://127.0.0.1:5000/upload/shop/', //头像默认地址
                dialogImageUrl: '',
                dialogVisible: false,
                List:['在线支付满28减5','VC无限橙果汁全场8折','单人精彩套餐','特价饮品8折抢购','单人特色套餐'],
            }
        },
        methods:{
            // 头像上传
            uploadAvatar(file){
                this.list.avatar = (file.imgUrl);
            },
            // 上传图片
            uploadPic(file){
                this.list.pics.push(file.imgUrl);
                console.log(this.list.pics)
            },
            // 删除图片
            handleRemove(res) {
                if(this.list.pics.indexOf(res.name) == -1){
                    this.list.pics.splice(this.list.pics.indexOf(res.response.imgUrl),1)
                }else{
                    this.list.pics.splice(this.list.pics.indexOf(res.name),1)
                }
            },
            // 保存提交
            shopcChange(){
                if(!this.list.state){
                    let arr = {...this.list};
                    arr.date[0] = this.$moment(arr.date[0]).format('YYYY-MM-DD HH:mm:ss');
                    arr.date[1] =this.$moment(arr.date[1]).format('YYYY-MM-DD HH:mm:ss');
                    arr.date = JSON.stringify(arr.date);
                    arr.supports = JSON.stringify(arr.supports);
                    arr.pics = JSON.stringify(arr.pics);
                    $shopEdit(arr).then(res =>{
                        if(res.data.code == 0){
                            this.$message({
                                message: res.data.msg,
                                type: 'success',
                            })
                        }else
                            this.$message.error(res.data.msg);
                    })
                }
                this.list.state = !this.list.state;
            }
        },
        created(){
            $shopInfo().then(res =>{
                let arr = res.data.data;
                arr.date[0] = this.$moment(arr.date[0]).format('YYYY-MM-DD HH:mm:ss');
                arr.date[1] = this.$moment(arr.date[1]).format('YYYY-MM-DD HH:mm:ss');
                arr.state = true;
                this.picsList = arr.pics.map(item =>{
                    return{name:item,url:this.imgsrc+item}
                })
                this.list = arr;
            })
        }
    }
</script>

<style lang="less" scoped>
    #store{
        padding: 10px;
        .title{
            height: 50px;
            line-height: 50px;
            text-indent: 20px;
            margin-bottom: 2px;
            background-color: #fff;
            position: relative;
            .el-button--small{
                position: absolute;
                right: 10px;
                bottom: 5px;
            }
        }
        .content{
            padding: 20px 0 20px 25px;
            background-color: #fff;
            >div{
                margin-bottom: 25px;
                display: flex;
                align-items: center;
                width: 50%;
                span{
                    width: 70px;
                    line-height: 40px;
                    text-align: right;
                    margin-right: 10px;
                }
                /deep/.el-upload{
                    width: 150px;
                    height: 150px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .shopPics{
                    display: flex;
                    flex-wrap: wrap;
                    img{
                        width: 140px;
                        height: 140px;
                        margin: 5px;
                    }
                }
                .el-input{
                    width: 380px;
                }
                .el-textarea{
                    width: 380px;
                    vertical-align:top;
                }
                .el-checkbox-group{
                    width: 375px;
                }
            }
        }
    }
</style>