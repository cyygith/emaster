<template>
    <div id="itemlist-panel" class="itemlist-panel">
        <div class="black-panel">&nbsp;</div>
        <div class="condition-panel">
            <el-form ref="form" :model="form" label-width="120px">
                <el-row :gutter="24">
                    <el-col :span="7">
                        <el-form-item label="部门编号" prop="deptCode">
                            <el-input v-model="form.deptCode" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="7">
                        <el-form-item label="部门名称" prop="name">
                            <el-input v-model="form.name" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="状态" prop="status">
                            <el-select
                                v-model="form.status"
                                placeholder="请选择"
                                style="width:100%"
                                size="small"
                            >
                                <el-option
                                    v-for="it in statusArr"
                                    :key="it.value"
                                    :label="it.label"
                                    :value="it.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <div v-if="queryMore">
                    <el-row :gutter="24">
                        <el-col :span="7">
                            <el-form-item label="是否删除" prop="delFlag">
                                <el-select
                                    v-model="form.delFlag"
                                    placeholder="请选择"
                                    style="width:100%"
                                    size="small"
                                >
                                    <el-option
                                        v-for="it in delFlagArr"
                                        :key="it.value"
                                        :label="it.label"
                                        :value="it.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <el-row justify="center">
                    <el-col :span="1" :offset="7">
                        <el-button
                            type="primary"
                            icon="el-icon-search"
                            @click="queryList"
                            size="small"
                        >查 询</el-button>
                    </el-col>
                    <el-col :span="1" :offset="1">
                        <el-button
                            plain
                            icon="el-icon-switch-button"
                            size="small"
                            @click="resetForm"
                        >重 置</el-button>
                    </el-col>
                    <el-col :span="1" :offset="1">
                        <el-button
                            type="text"
                            icon="queryMore==false?'el-icon-arrow-down':'el-icon-arrow-up'"
                            size="small"
                            @click="queryMore==true?queryMore=false:queryMore=true"
                        >更多查询</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="list-panel">
            <div class="list-button-p">
                <el-row>
                    <el-col :span="1">
                        <el-button type="primary" icon="el-icon-search" @click="add" size="small">新增</el-button>
                    </el-col>
                    <el-col :span="1" :offset="1">
                        <el-button
                            type="primary"
                            icon="el-icon-s-custom"
                            @click="del"
                            size="small"
                        >删除</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="list-list">
                <el-table
                    :data="tableData"
                    ref="multipleTable"
                    style="width: 100%"
                    row-key="deptId"
                    border
                    lazy
                    :load="load"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                >
                    <el-table-column fixed type="selection" width="40"></el-table-column>
                    <el-table-column prop="deptId" label="部门id" v-show="false"></el-table-column>
                    <el-table-column prop="parentId" label="上级部门ID"></el-table-column>
                    <el-table-column prop="name" label="部门名称"></el-table-column>
                    <el-table-column prop="orderNum" label="排序"></el-table-column>
                    <el-table-column prop="delFlag" label="是否删除"></el-table-column>
                    <el-table-column prop="deptCode" label="部门编号"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button @click="update(scope.row)" type="warning" size="mini">编辑</el-button>
                            <el-button @click="detail(scope.row)" type="primary" size="mini">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="black-panel">&nbsp;</div>
        <div class="popdialog-container">
            <el-dialog
                :title="dialogTitle"
                width="60%"
                v-if="dialogVisible"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="handleClose"
            >
                <sys-dept :checkrow="checkRow" @closechild="closechild"></sys-dept>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import sysDept from "@/components/page/sys/dept/sysDeptManager";
import { deptApi } from "@/service/sys-api";
export default {
    name: "sysDept",
    data() {
        return {
            dialogVisible: false,
            visible: false,
            form: {
                parentId: "",
                name: "",
                orderNum: "",
                delFlag: "",
                deptCode: "",
                status: "",
                remark: ""
            },
            delFlagArr: [
                { label: "已删除", value: "-1" },
                { label: "未删除", value: "1" }
            ],
            statusArr: [
                { label: "启用", value: "1" },
                { label: "禁用", value: "0" }
            ],
            page: {
                pageSize: 5,
                currPage: 1,
                totalPage: 0
            },
            tableData: [],
            checkRow: {}, //选择的条数
            queryMore: false, //查询更多
            dialogTitle: "新增",
            parentId: "0"
        };
    },
    components: {
        "sys-dept": sysDept
    },
    mounted() {
        this.queryList();
    },
    methods: {
        //改变每页条数
        handleSizeChange(val) {
            this.page.pageSize = val;
            this.queryList();
        },
        //改变当前页面
        handleCurrentChange(val) {
            this.page.currPage = val;
            this.queryList();
        },
        //关闭弹出窗口
        handleClose(done) {
            this.dialogVisible = false;
        },
        //关闭子窗口
        closechild() {
            this.dialogVisible = false;
            //this.queryList();
        },
        //重置
        resetForm() {
            this.$refs["form"].resetFields();
        },
        //加载数据
        load(tree, treeNode, resolve) {
            let param = {
                parentId: tree.deptId
            };
            let loading = this.$loading({lock:true,text:'处理中....',background:'rgba(0,0,0,0.5)',target: document.querySelector('.list-panel')});
            deptApi.list(param).then(res => {
                if (res.code == "0") {
                    resolve(res.data);
                } else {
                    this.$alert("程序出现异常，请联系管理员处理", "提示信息");
                }
                loading.close();
            });
        },
        //查询list数据
        queryList() {
            let param = {
                parentId: "0"
            };
            deptApi.list(param).then(res => {
                try {
                    if (res.code == "0") {
                        this.tableData = res.data;
                    }
                } catch (err) {
                    this.$alert("程序出现异常，请联系管理员处理", "提示信息");
                }
            });
        },
        //新增
        add() {
            let ll = this.$refs.multipleTable.selection;
            if (ll.length < 1) {
                this.$confirm('请选择一条数据作为父节点，或者直接新增顶级节点','提示',{
                    confirmButtonText: '确定', 
                    cancelButtonText: '取消', 
                    type: 'warning'
                }).then(()=>{
                    this.dialogVisible = true;
                    this.checkRow.type = "add";
                    this.dialogTitle = "新增";
                }).catch(()=>{

                });
            }else{
                this.checkRow.selArr = ll;
                this.dialogVisible = true;
                this.checkRow.type = "add";
                this.dialogTitle = "新增";
            }
        },
        //修改
        update(row) {
            this.checkRow.selArr = row;
            this.checkRow.type = "update";
            this.dialogVisible = true;
            this.dialogTitle = "修改";
        },
        //查看详情
        detail(row) {
            this.checkRow.selArr = row;
            this.checkRow.type = "detail";
            this.dialogVisible = true;
            this.dialogTitle = "查看详情";
        },
        //删除
        del() {
            this.checkRow.type = "del";
            let ll = this.$refs.multipleTable.selection;
            if (ll.length < 1) {
                this.$message({
                    showClose: true,
                    type: "warning",
                    message: "请选择删除的行！",
                    duration: 2000
                });
            }
            let idArr = ll.map((e, i) => {
                return e.deptId;
            });
            let param = {
                ids: idArr.join(",")
            };

            deptApi.deleteByIds(param).then(res => {
                if (res.code == "0") {
                    this.$message({
                        showClose: true,
                        message: "删除成功！",
                        duration: 2000
                    });
                    this.queryList(); //关闭后刷新界面
                } else {
                    this.$message({
                        showClose: true,
                        message: "删除失败，程序出现异常，请联系管理员处理"
                    });
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/components/page/style/normal";
</style>

