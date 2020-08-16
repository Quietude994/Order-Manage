<template>
    <div>
        <div>
            <div class="title">
                商品分类
                <el-button type="primary" size="small" @click ='changeStatus'>添加分类</el-button>
            </div>
            <el-table 
            :data="tableData" 
            :style="{height:height}"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading">
                <el-table-column prop="id" label="商品名称" width="180">

                </el-table-column>
                <el-table-column  label="所属分类" width="380">
                    <template slot-scope="scope">
                        <span v-show="!scope.row.isEdit">{{ scope.row.cateName }}</span>
                        <el-input v-model="scope.row.cateName" v-show="scope.row.isEdit" />
                    </template>
                </el-table-column>
                <el-table-column label="是否启用">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.state" active-color="#13ce66" :disabled="!scope.row.isEdit">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">{{scope.row.isEdit ? '完成':'编辑'}}</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <Page :msg ="list" @handSizeChange="SizeChange" @handCurrentChange ="CurrentChange" />
        </div>
        <!-- 添加分类 -->
        <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                <el-input v-model="form.cateName" autocomplete="off"></el-input>
                </el-form-item>
                <div class="switch">
                    <span class="label">是否禁用</span>
                    <el-switch v-model="form.state" active-color="#13ce66">
                    </el-switch>
                </div>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeMsg">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>

<script>
    import {$catelist,$addcate,$delcate,$editcate} from '@/api/apis';
    import Page from '@/components/Pagination';
    export default {
        components:{
            Page,
        },
         data() {
            return {
                list:{
                    page_sizes:"[5, 10, 15, 20, 30, 40]",
                    page_size: 5,
                    current_page: 1,
                    layout: "total, prev, pager, next, jumper",
                    total: null,
                },
                dialogFormVisible: false, //显示与隐藏
                form: {
                    cateName: '', //添加名称
                    state: true, //添加状态
                },
                formLabelWidth: '120px',
                tableData: [], //数据
                loading:true, //是否显示加载
                height:'310px', //高度
            }
        },
        created(){
            this.getList()
        },
         methods: {
            //  获取数据
             getList(){
                 this.loading = true;
               $catelist(this.list.current_page,this.list.page_size).then(res =>{
                    let arr = res.data.data.map(item =>{
                        item.state = Boolean(item.state);
                        item.isEdit = false;
                        return item;
                   })
                   this.height = null;
                    this.tableData = arr
                    this.list.total = res.data.total;
                    this.loading = false;
                })
            },
            // 改变页数
            CurrentChange(val){
                this.list = val;
                this.getList();
            },
            // 改变条数
            SizeChange(val){
                this.list = val;
                this.getList();
            },
            // 编辑
            handleEdit(row) {
                if(!row.isEdit){
                    row.isEdit = true;
                }else{
                    row.isEdit = false;
                    $editcate(row.id,row.cateName,row.state).then(res =>{
                        if(res.data.code == 0){
                            this.$message({
                                message: res.data.msg,
                                type: 'success',
                            })
                        }else
                            this.$message.error(res.data.msg);
                    })
                }
            },
            // 删除
            handleDelete(row) {
                this.$confirm('是否删除该分类?', '系统提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        $delcate(row.id).then(res =>{
                            if(res.data.code == 0){
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success',
                                });
                                this.getList();
                            }else
                                this.$message.error(res.data.msg);
                    })
                });        
            },
            // 添加分类点击事件
            changeStatus(){
                this.dialogFormVisible = true;
            },
            // 添加分类提交
            changeMsg(){
                $addcate(this.form.cateName,this.form.state).then(res =>{
                    if(res.data.code == 0){
                        this.$message({
                            message: res.data.msg,
                            type: 'success',
                        });
                        this.dialogFormVisible = false;
                        this.form.cateName = '';
                        this.getList();
                    }else
                        this.$message.error(res.data.msg);
                })
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
        position: relative;
        .el-button--small{
            position: absolute;
            right: 10px;
            bottom: 5px;
        }
    }
    .el-input{
        width: 200px;
    }
    .switch{
        display: flex;
        .label{
            width: 108px;
            padding-right: 12px;
            text-align: right;
        }
    }
    /deep/.el-input__inner{
        height: 28px;
    }
</style>