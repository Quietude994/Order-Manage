<template>
    <div>
        <p>管理员信息</p>
        <ul>
            <li>
                <span>管理员ID: </span>
                <span>{{ msg.id }}</span>
            </li>
            <li>
                <span>账号: </span>
                <span>{{ msg.account }}</span>
            </li>
            <li>
                <span>用户组: </span>
                <span>{{ msg.userGroup }}</span>
            </li>
            <li>
                <span>创建时间: </span>
                <span>{{ msg.ctime }}</span>
            </li>
            <li>
                <span>管理员头像: </span>
                <el-upload
                    class="avatar-uploader"
                    :action="avatar_upload"
                    :data="{id:msg.id}"
                    list-type="picture-card"
                    :show-file-list="false"
                    :on-success="imgSuccess"
                    :before-upload="beforeUpload">
                    <img v-if="msg.imgUrl" :src="msg.imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </li>
        </ul>
    </div>
</template>

<script>
    import {$accountinfo,avatar_upload} from '@/api/apis';

    export default {
        created(){
            // 获取数据
            $accountinfo(localStorage.id).then(res =>{
                this.msg = res.data.accountInfo;
                this.msg.ctime = this.$moment(this.msg.ctime).format('YYYY-MM-DD HH:mm:ss');
            })
        },
        data(){
            return{
                size:100,
                msg:{}, //数据
                avatar_upload, //头像上传接口
            }
        },
        methods:{
            // 更换头像
            imgSuccess(res, file) {
                if(res.code == 0){
                    this.msg.imgUrl = URL.createObjectURL(file.raw);
                    this.$bus.$emit('upload');
                    this.$message({
                        message: '更改成功',
                        type: 'success',
                    })
                }
                
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
    div{
        background-color: #fff;
        p{
            text-indent: 20px;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #ccc;
        }
        ul{
            padding: 0 20px;
            li:not(:last-child){
                border-bottom: 1px solid #ccc;
                height: 60px;
                line-height: 60px;
            }
            li:last-child{
                padding: 5px 0;
                display: flex;
                align-items: center;
            }
        }
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    /deep/.el-upload--picture-card{
        border: 0;
        width: 100px;
        height: 100px;
        line-height: 100px;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: inline-block;
    }
</style>