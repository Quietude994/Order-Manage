<template>
    <div class="setting">
        <div class="login" >
            <h3>点我吧后台系统</h3>
            <el-input v-model="username" placeholder="请输入内容" clearable prefix-icon='el-icon-s-custom' @keydown.native.enter="clickLogin"></el-input>
            <el-input placeholder="请输入密码" v-model="pwd" show-password clearable prefix-icon='el-icon-lock' @keydown.native.enter="clickLogin"></el-input>
            <p class="error-p">{{ errormsg }}</p>
            <el-button type="primary" @click="clickLogin">登录</el-button>
        </div>
    </div>
</template>

<script>
    import {$login} from '@/api/apis';

    export default {
        data(){
            return{
                username:null, //用户名
                pwd:null, //密码
                errormsg: null, //错误提示
            }
        },
        methods:{
            //登录
            clickLogin(){
                $login(this.username,this.pwd).then( res =>{
                    if(res.data.code == 0){
                        localStorage.username = this.username; // 保存用户名
                        localStorage.role = res.data.role; //保存role
                        localStorage.token = res.data.token; //保存token
                        localStorage.id = res.data.id; //保存id
                        this.$message({
                            message: '恭喜你,登录成功',
                            type: 'success',
                        })
                        this.$router.push('/index/Default');
                    }
                    else
                        this.errormsg =  res.data.msg
                })
            },
        }
    }
</script>
<style lang="less" scoped>
    .setting{
        width: 100%;
        height: 100%;
        background:url('../assets/imgs/timg.jpg') no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        .login{
            width: 550px;
            h3{
                color: #fff;
                font-size: 30px;
                text-align: center;
                margin-bottom: 60px;
            }
            .el-input{
                margin-bottom: 30px;
                font-size: 18px;
                height: 50px;
            }
            /deep/.el-input__inner{
                height: 50px;
                background-color: transparent;
                color: #fff;
            }
            .el-button{
                width: 100%;
                height: 40px;
                font-size: 18px;
                height: 50px;
            }
            .error-p{
                height: 20px;
                color: red;
                font-size: 16px;
                text-indent: 20px;
                margin-bottom: 10px;
            }
        }
    }
</style>