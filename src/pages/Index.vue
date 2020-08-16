<template>
    <el-container>
        <el-aside width="250px">
            <!-- 导航 -->
            <div class="picture">
                <i class="el-icon-dish"></i>
                <h3>点我吧外卖</h3>
            </div>
            <Nav :role ="role" :hash ='hash'/>
        </el-aside>
        <el-container>
            <el-header>
                <!-- 面包屑 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item v-for="item in breadList" :key="item">{{ item }}</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- 头像 -->
                <div id="portraits">
                     <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">{{acc}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <router-link :to="{ path:'/index/personal'}">
                        <el-avatar :size="size" :src="circleUrl"></el-avatar>
                    </router-link>
                </div>
            </el-header>
            <!-- router出口 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <!-- 提示 -->
        <el-dialog
        title="系统提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>确定退出吗?</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sure">确 定</el-button>
        </span>
        </el-dialog>
    </el-container>
</template>

<script>
    import Nav from '../components/Navigation';
    import {$token,$accountinfo} from '@/api/apis';

    export default {
        data(){
            return{
                role:null, //权限
                size:50, //头像尺寸
                circleUrl:null, //头像路径
                acc: null, //用户名
                hash:null, //hash
                breadList:[], //面包屑列表
                dialogVisible: false //显示or隐藏
            }
        },
        components: {
            Nav,
        },
        methods:{
            // 获取数据
            getaccInfo(){
                $accountinfo(localStorage.id).then(res =>{
                    this.circleUrl = res.data.accountInfo.imgUrl;
                })
            },
            handleCommand(command){
                if(command == '1')
                    this.dialogVisible = true;
            },
            // 确定退出
            sure(){
                this.dialogVisible = false;
                this.$router.push('/');
                localStorage.removeItem('token');
            }
        },
        created(){
            this.role = localStorage.role; //获取权限
            this.hash = this.$route.path; //获取hash
            // 检测token
            $token(localStorage.token).then( res => {
                if(res.data.code ==0 ) 
                    this.acc = `欢迎您,${localStorage.username}`
                else
                    this.acc = `请前往登录`
            });
            this.getaccInfo();
            // 刷新头像
            this.$bus.$on('upload',() => {
                this.getaccInfo()
            });
            // 刷新面包屑
            this.breadList = this.$route.meta.breadList;
        },
        watch:{
            $route(to){
                this.breadList = to.meta.breadList;
                this.hash = to.path;
            }
        }
    }
</script>

<style lang="less" scoped>
    .picture{
        height: 50px;
        display: flex;
        align-items: center;
        i{
            font-size: 30px;
            color: #00AAFF;
            margin: 0 5px 0 40px;
        }
        h3{
            font-weight: normal;
            font-size: 18px;
            color: #fff;
        }
    }
    .el-container{
        min-height: 100%;
    }
    .el-aside{
        background-color: #304156;
    }
    .el-main{
        background-color: #F0F2F5;
    }
    .el-header{
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        margin-bottom: 10px;
    }
    .el-breadcrumb{
        font-size: 16px;
        line-height: 60px;
    }
    #portraits{
        margin-right: 20px;
        line-height: 60px;
        span{
            vertical-align: middle;
            cursor: pointer;
        }
        i{
           margin-right: 10px; 
        }
    }
</style>