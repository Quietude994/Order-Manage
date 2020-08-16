<template>
    <div>
        <p class="title">添加账号</p>
        <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号">
                <el-input type="text" v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" show-password v-model="pwd"></el-input>
            </el-form-item>
            <!-- 用户组 -->
           <el-form-item label="用户组">
                <el-select placeholder="请选择用户组" v-model="value">
                    <el-option v-for="(item,index) in list" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
                <el-button type="primary" @click="addName">添加</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import{$addUsers} from '@/api/apis';

    export default {
        data() {
            return{
                value: '', //用户组
                name:'', //用户名
                pwd:'', //密码
                list:[
                    {lable:"超级管理员",value:"超级管理员"},
                    {lable:"普通管理员",value:"普通管理员"},
                    ]
            }
        },
        methods:{
            // 添加账户
            addName(){
                let {name,pwd,value} = this;
                $addUsers(name,pwd,value).then( res =>{
                    if(res.data.code == 0){
                        this.$message({
                            message: res.data.msg,
                            type: 'success',
                        })
                        this.value ='';
                        this.name ='';
                        this.pwd ='';
                    }else
                        this.$message.error(res.data.msg)
                })
            },
            // 重置
             resetForm() {
                 this.value ='';
                 this.name ='';
                 this.pwd ='';
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
    .el-input{
        width: 300px;
    }
    .el-select{
        width: 300px;
    }
    form{
        margin-top: 30px;
        padding: 20px;
        background-color: #fff;
    }
</style>