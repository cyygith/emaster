<template>
    <div id="itemlist-panel" class="itemlist-panel">
        <div class="black-panel"> &nbsp;</div>
        <div class="condition-panel">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="商品名称：">
                                <el-input v-model="form.cname" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="上级节点：">
                                <el-select v-model="form.pid" placeholder="请选择" style="width:100%">
                                    <el-option
                                        v-for="item in form.pid"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>   
                    </el-row>
                    <el-row justify="center">
                        <el-col :span="1" :offset="7">
                            <el-button type="primary" icon="el-icon-search" @click="searchGoods" size="small">查 询</el-button>
                        </el-col>
                        <el-col :span="1" :offset="1">
                            <el-button plain icon="el-icon-switch-button" size="small">重 置</el-button>
                        </el-col>
                    </el-row>
                </el-form>
        </div>

        <div class="list-panel">
            <div class="list-button-p">
                <el-row>
                    <el-col :span="1">
                        <el-button type="primary" icon="el-icon-search" @click="dialogVisible = true" size="small">新增</el-button>
                    </el-col>
                    <el-col :span="1" :offset="1">
                        <el-button type="primary" icon="el-icon-s-custom"  size="small">排序</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="list-list">
                <el-table border style="width: 100%" :data="tableData">
                        <el-table-column type="selection" width="40"></el-table-column>
                        <el-table-column prop="CNAME" label="商品名称"></el-table-column>
                        <el-table-column prop="pid" label="上级父节点"></el-table-column>
                        <el-table-column prop="T_PRICE" label="原价"></el-table-column>
                        <el-table-column prop="D_PRICE" label="折扣价"></el-table-column>
                        <el-table-column prop="SELL_COUNT" label="月销量"></el-table-column>
                        <el-table-column prop="TICKET" label="优惠券"></el-table-column>
                        <el-table-column prop="C_URL" label="优惠券地址"></el-table-column>
                </el-table>
            </div>
            <div class="list-page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </div>    
        </div>
        <div class="black-panel"> &nbsp;</div>
        <div class="popdialog-container">
            <el-dialog 
                title="新增商品详情"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose">
                <item-manager></item-manager>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { goodlistbyC } from "../../../service/getData"
import itemManager from "@/components/page/ticket/itemManager"
export default {
    name:'itemList',
    data(){
        return {
            dialogVisible:false,
            visible:false,
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            form:{
                cname:'',
                ename:'',
                pid:'',
                c_url:'',
                t_price:0,
                d_price:0,
                sell_count:0,
                ticket:0.0,
                describe:'',
                ImgArr:[]
            },
            tableData: []
        }
    },
    components:{
        'item-manager' : itemManager
    },
    mounted(){
        goodlistbyC('11').then(res =>{
            this.tableData = res;
        })
        console.dir(this.tableData);
    },
    methods:{
        handleSizeChange(val) {
            console.log(`${val} items per page`);
        },
        handleCurrentChange(val) {
            console.log(`current page: ${val}`);
        },
        handleClose(done) {
            this.dialogVisible = false;
        },
        searchGoods() {
            goodlistbyC('11').then(res =>{
                this.tableData = res;
            })
        }
    }
}
</script>
<style lang="scss" scoped>
#itemlist-panel{
    background-color: rgb(202, 199, 199);
}
.black-panel{
    height:0.5rem;
}
.condition-panel{
    position: relative;
    background-color: white;
    padding: 0.5rem;
    margin: 0rem 0.5rem 0.5rem 0.5rem;
}
.list-panel{
    margin:0.5rem;
    background-color: white;
    padding: 2rem;
}
.list-panel .list-button-p{
    margin-bottom: 1rem;
}
/**elementui 源生***/
.popdialog-container /deep/ .el-dialog__header{
    background-color:#e0eff5;
}
/**elementui 源生***/
#itemlist-panel /deep/ .el-form-item{
    margin-bottom:0.7rem;
}
</style>

