<template>
    <div class="list-box">
        <p class="title">商品列表</p>
        <el-table 
        ref="multipleTable" 
        :data="tableData" 
        :style="{height:height}"  
        @selection-change="handleSelectionChange"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading">
            <el-table-column type="selection" width="80" name='number'>

            </el-table-column>
            <el-table-column label="账号" width="240" prop="account">

            </el-table-column>
            <el-table-column prop="userGroup" label="用户组" width="300">

            </el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="300">

            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <Page :msg ="pageList" @handSizeChange="SizeChange" @handCurrentChange ="CurrentChange" />
        <!-- 批量删除/取消全选 -->
        <el-row>
            <el-button type="danger" @click="Delete">批量删除</el-button>
            <el-button type="primary" @click="toggleSelection">取消全选</el-button>
        </el-row>
        <!-- 修改用户 -->
        <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="form.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户组" :label-width="formLabelWidth">
                <el-select v-model="form.userGroup">
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    <el-option label="普通管理员" value="普通管理员"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeMsg">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {$getList,$removeAcc,$removeId,$revise} from '@/api/apis';
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
                tableData: [], //数据数
                dialogFormVisible: false, //显示与隐藏
                form: {  //修改账户
                    account: '',
                    userGroup: '',
                    id:null,
                },
                formLabelWidth: '120px',
                loading: true, //是否显示
                height:'210px', //高度
            };
        },
        methods:{
            // 获取数据
            getdata(){
                this.loading = true;
                $getList(this.pageList.current_page,this.pageList.page_size).then(res =>{
                    let arr = res.data.data;
                    this.pageList.total = res.data.total; //总条数
                    arr.forEach(item => {
                        item.ctime = this.$moment(item.ctime).format('YYYY-MM-DD HH:mm:ss');// 处理时间
                    });
                    this.height = null;
                    this.tableData = arr;
                    this.loading = false;
                })
            },
            // 改变页数
            CurrentChange(val){
                this.pageList = val;
                this.getData();
            },
            //改变条数
            SizeChange(val){
                this.pageList = val;
                this.getData();
            },
            // 编辑
            handleEdit(row){
                this.form.id = row.id;
                this.form.account = row.account;
                this.form.userGroup = row.userGroup;
                this.dialogFormVisible = true;
            },
            // 更改
            changeMsg(){
                let {id,account,userGroup} = this.form;
                $revise(id,account,userGroup).then(res =>{
                    if(res.data.code == 0){
                        this.$message({
                            message: res.data.msg,
                            type: 'success',
                        });
                        this.getdata();
                    }else
                        this.$message.error(res.data.msg)
                    this.dialogFormVisible = false;
                })
            },
            // 选中
            handleSelectionChange(val){
                this.ids = val.map(item => item.id);
            },
            // 删除
            handleDelete(row){
                this.$confirm('是否删除该账户?', '系统提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $removeAcc(row.id).then(res =>{
                        if(res.data.code == 0){
                            this.$message({
                                    message: res.data.msg,
                                    type: 'success',
                                })
                            this.getdata();
                        }
                        else
                            this.$message.error(res.data.msg)
                    })
                })         
                    
            },
            // 取消全选
            toggleSelection() {
                this.$refs.multipleTable.clearSelection();
            },
            // 批量删除
            Delete(){
                if(this.ids.length != 0){
                    this.$confirm('是否删除选中的所有账户?', '系统提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        $removeId(JSON.stringify(this.ids)).then(res =>{
                            if(res.data.code == 0){
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success',
                                })
                                this.getdata();
                            }else
                                this.$message.error(res.data.msg)
                        })
                    }) 
                    }        
            }
        },
        created(){
            this.getdata();
        }
    }
</script>

<style lang="less" scoped>
    .list-box{
        padding: 20px;
        background-color: #fff;
        .el-pagination{
            margin-top: 20px;
        }
        .el-row{
            margin-top: 20px;
        }
        .el-input{
            width: 217px;
        }
    }
    
</style>