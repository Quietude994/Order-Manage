<template>
    <div>
        <p class="title">修改密码</p>
        <el-form label-width="100px" class="demo-ruleForm" :rules="rules" status-icon ref="ruleForm" :model="ruleForm">
            <el-form-item label="原密码" prop="oldPass">
                <el-input type="password" show-password v-model="ruleForm.oldPass"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
                <el-input type="password" show-password v-model="ruleForm.pass"></el-input>
            </el-form-item>
           <el-form-item label="确认新密码" prop="checkPass">
                <el-input type="password" show-password v-model="ruleForm.checkPass"></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
                <el-button type="primary" @click="addData('ruleForm')">修改</el-button>
                <el-button @click="reset('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
   import{$oldPwd,$editpwd} from '@/api/apis';

    export default {
        data(){
            var validatePass3 = (rule, value, callback) => {
                $oldPwd(value,localStorage.id).then(res =>{
                    if(res.data.code != 0)
                        callback(new Error(res.data.msg));
                    callback();
                })
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
             var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                ruleForm: {
                    pass: '', //密码
                    checkPass: '', //新密码
                    oldPass:'', //旧密码
                },
                rules: {
                    oldPass: [
                        { validator: validatePass3, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
            }
        },
        methods:{
            // 重置密码
            reset(formName){
                this.$refs[formName].resetFields();
            },
            // 修改密码
            addData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid){
                        $editpwd(this.ruleForm.pass,localStorage.id).then(res =>{
                            if(res.data.code == 0){
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success',
                                })
                                this.$router.push('/');
                            }
                            else{
                                this.$message.error(res.data.msg);
                            }
                        })
                    }else
                        return false;
                });
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